import mongoose from "mongoose";
import userProfile from "./userProfile.js";
import AidRequest from "./AidRequest.js";
import DonationRequest from "./DonationRequest.js";
import Notification from "./Notification.js";

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskType: {
        type: String,
        required: true,
        enum: ["aid", "donation"]
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "assigned", "accepted", "rejected", "completed"],
        default: "open"
    },
    priority: {
        type: String,
        required: true,
        enum: ["high", "medium", "low"]
    },
    // Number of volunteers needed for this task
    volunteersNeeded: {
        type: Number,
        default: 1,
        min: 1
    },
    // Array of assigned volunteers (supports multiple volunteers)
    assignedVolunteers: [{
        type: mongoose.Types.ObjectId,
        ref: userProfile.modelName
    }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // default: 'Point' - Removed to prevent invalid GeoJSON creation without coordinates
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: undefined
        }
    },
    imageUrl: {
        type: String,
        required: false
    },
    aidRequest: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: AidRequest.modelName,
        unique: true,
        sparse: true // Allow multiple nulls but unique non-null values
    },
    donationRequest: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: DonationRequest.modelName
    },
    proofImageUrl: {
        type: String,
        required: false
    },
    completedAt: {
        type: Date,
        required: false
    }
}, { timestamps: true });

// Virtual to check if task has open slots
taskSchema.virtual('hasOpenSlots').get(function() {
    return this.assignedVolunteers.length < this.volunteersNeeded;
});

// Virtual for remaining slots
taskSchema.virtual('remainingSlots').get(function() {
    return this.volunteersNeeded - this.assignedVolunteers.length;
});

// Pre-save hook: capture state before save
taskSchema.pre('save', function (next) {
    this._wasNew = this.isNew;
    this._previousVolunteers = this._original?.assignedVolunteers || [];
    next();
});

// Post-save hook: Create notifications
taskSchema.post('save', async function (doc) {
    try {
        // For NEW tasks
        if (this._wasNew) {
            // If task has assigned volunteers, notify each one
            if (doc.assignedVolunteers && doc.assignedVolunteers.length > 0) {
                console.log('[Task Hook] Creating notifications for assigned volunteers:', doc.assignedVolunteers);
                
                for (const volunteerId of doc.assignedVolunteers) {
                    await Notification.create({
                        title: 'New Task Assigned',
                        body: `You have been assigned: ${doc.taskName}`,
                        recipientId: volunteerId,
                        type: 'task_assigned',
                    });
                }
                console.log('[Task Hook] Assigned volunteer notifications created');
            }
            
            // If task is open, broadcast to all volunteers
            if (doc.status === 'open') {
                console.log('[Task Hook] Creating broadcast notification for open task');
                await Notification.create({
                    title: 'New Task Available',
                    body: `A new task is available: ${doc.taskName}`,
                    recipientId: null, // null = broadcast to all
                    type: 'task_open_broadcast',
                    targetUserType: 'volunteer',
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
                    await AidRequest.findByIdAndUpdate(doc.aidRequest, { status: targetStatus });
                    console.log(`[Task Hook] Updated AidRequest ${doc.aidRequest} status to ${targetStatus}`);
                } else if (doc.taskType === 'donation' && doc.donationRequest) {
                    await DonationRequest.findByIdAndUpdate(doc.donationRequest, { status: targetStatus });
                    console.log(`[Task Hook] Updated DonationRequest ${doc.donationRequest} status to ${targetStatus}`);
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

export default mongoose.model("TaskSchema", taskSchema)