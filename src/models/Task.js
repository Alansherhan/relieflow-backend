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
                });
                console.log('[Task Hook] Broadcast notification created');
            }

            // Notify public user who made the aid request
            if (doc.aidRequest) {
                const aidReq = await AidRequest.findById(doc.aidRequest);
                if (aidReq && aidReq.aidRequestedBy) {
                    console.log('[Task Hook] Notifying public user:', aidReq.aidRequestedBy);
                    await Notification.create({
                        title: 'Your Request is Being Processed',
                        body: `Your aid request is now being handled by our volunteers.`,
                        recipientId: aidReq.aidRequestedBy,
                        type: 'aid_request_in_progress',
                    });
                }
            }
        }
    } catch (error) {
        console.error('[Task Hook] Error creating task notification:', error);
    }
});

// Ensure virtuals are serialized
taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

// Add geospatial index for location-based queries
taskSchema.index({ location: '2dsphere' });

export default mongoose.model("TaskSchema", taskSchema)