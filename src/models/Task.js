import mongoose from 'mongoose';
import userProfile from './userProfile.js';
import AidRequest from './AidRequest.js';
import DonationRequest from './DonationRequest.js';
import Notification from './Notification.js';

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskType: {
      type: String,
      required: true,
      enum: ['aid', 'donation'],
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'assigned', 'accepted', 'rejected', 'completed'],
      default: 'open',
    },
    priority: {
      type: String,
      required: true,
      enum: ['high', 'medium', 'low'],
    },
    // Number of volunteers needed for this task
    volunteersNeeded: {
      type: Number,
      default: 1,
      min: 1,
    },
    // Array of assigned volunteers (supports multiple volunteers)
    assignedVolunteers: [
      {
        type: mongoose.Types.ObjectId,
        ref: userProfile.modelName,
      },
    ],
    // Pickup location - where volunteer picks up items (donor's location)
    pickupLocation: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: undefined,
      },
    },
    // Delivery location - where volunteer delivers items (beneficiary's location)
    deliveryLocation: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: undefined,
      },
    },
    // Legacy location field (kept for backward compatibility with aid requests)
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: undefined,
      },
    },
    // Pickup address (text form for display)
    pickupAddress: {
      addressLine1: String,
      addressLine2: String,
      addressLine3: String,
      pinCode: Number,
    },
    // Delivery address (text form for display)
    deliveryAddress: {
      addressLine1: String,
      addressLine2: String,
      addressLine3: String,
      pinCode: Number,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    aidRequest: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: AidRequest.modelName,
      unique: true,
      sparse: true, // Allow multiple nulls but unique non-null values
    },
    donationRequest: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: DonationRequest.modelName,
    },
    proofImageUrl: {
      type: String,
      required: false,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    // Flag to skip notification from post-save hook (when caller handles it)
    skipNotification: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Virtual to check if task has open slots
taskSchema.virtual('hasOpenSlots').get(function () {
  return this.assignedVolunteers.length < this.volunteersNeeded;
});

// Virtual for remaining slots
taskSchema.virtual('remainingSlots').get(function () {
  return this.volunteersNeeded - this.assignedVolunteers.length;
});

// Pre-save hook: capture state before save
taskSchema.pre('save', function (next) {
  this._wasNew = this.isNew;
  this._previousVolunteers = this._original?.assignedVolunteers || [];
  // Capture skipNotification before save (it may not persist to DB)
  this._skipNotification = this.skipNotification;
  next();
});

// Post-save hook: Create notifications
taskSchema.post('save', async function (doc) {
  // Skip notification if flag is set (caller handles it)
  // Check both the doc property and the captured _skipNotification
  if (doc.skipNotification || this._skipNotification) {
    console.log('[Task Hook] Skipping notification (skipNotification=true)');
    return;
  }

  console.log(
    '[Task Hook] Processing notification for task:',
    doc._id,
    'status:',
    doc.status,
    'wasNew:',
    this._wasNew
  );

  try {
    // For NEW tasks
    if (this._wasNew) {
      // If task has assigned volunteers, notify each one
      if (doc.assignedVolunteers && doc.assignedVolunteers.length > 0) {
        console.log(
          '[Task Hook] Creating notifications for assigned volunteers:',
          doc.assignedVolunteers
        );

        for (const volunteerId of doc.assignedVolunteers) {
          await Notification.create({
            title: 'New Task Assigned',
            body: `You have been assigned: ${doc.taskName}`,
            recipientId: volunteerId,
            type: 'task_assigned',
            data: {
              taskId: doc._id.toString(),
            },
          });
        }
        console.log('[Task Hook] Assigned volunteer notifications created');
      }

      // If task is open, broadcast to all volunteers
      if (doc.status === 'open') {
        console.log(
          '[Task Hook] Creating broadcast notification for open task'
        );
        await Notification.create({
          title: 'New Task Available',
          body: `A new task is available: ${doc.taskName}`,
          recipientId: null, // null = broadcast to all
          type: 'task_open_broadcast',
          targetUserType: 'volunteer',
          data: {
            taskId: doc._id.toString(),
          },
        });
        console.log('[Task Hook] Broadcast notification created');
      }

      // Notify public user logic moved to when volunteer specifically accepts/claims the task
      // This prevents premature "Being Processed" notifications
    }
  } catch (error) {
    console.error('[Task Hook] Error creating task notification:', error);
  }

  try {
    // Sync status to linked requests
    // If task is accepted (in progress) or completed, update the underlying request
    if (['accepted', 'completed', 'rejected', 'open'].includes(doc.status)) {
      let targetStatus;

      if (doc.status === 'accepted') {
        targetStatus = 'in_progress';
      } else if (doc.status === 'completed') {
        targetStatus = 'completed';
      } else if (doc.status === 'rejected') {
        targetStatus = 'accepted'; // Revert to accepted (available for others or re-assignment)
      }

      if (targetStatus) {
        if (doc.taskType === 'aid' && doc.aidRequest) {
          await AidRequest.findByIdAndUpdate(doc.aidRequest, {
            status: targetStatus,
          });
          console.log(
            `[Task Hook] Updated AidRequest ${doc.aidRequest} status to ${targetStatus}`
          );
        } else if (doc.taskType === 'donation' && doc.donationRequest) {
          await DonationRequest.findByIdAndUpdate(doc.donationRequest, {
            status: targetStatus,
          });
          console.log(
            `[Task Hook] Updated DonationRequest ${doc.donationRequest} status to ${targetStatus}`
          );
        }
      }
    }
  } catch (error) {
    console.error('[Task Hook] Error syncing request status:', error);
  }
});

// Ensure virtuals are serialized
taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

// Add geospatial index for location-based queries
taskSchema.index({ location: '2dsphere' });

export default mongoose.model('TaskSchema', taskSchema);
