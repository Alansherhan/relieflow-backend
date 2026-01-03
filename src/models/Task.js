import mongoose from "mongoose";
import userProfile from "./userProfile.js";
import AidRequest from "./AidRequest.js";
// import AidRequest from "./AidRequest.js";
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
        enum: ["accepted", "pending", "rejected", "completed"]
    },
    priority: {
        type: String,
        required: true,
        enum: ["high", "medium", "low"]
    },
    assignedTo: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: userProfile.modelName
    },
    imageUrl: {
        type: String,
        required: false
    },
    aidRequest: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: AidRequest.modelName
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
})

// Pre-save hook: capture if document is new (before save changes isNew to false)
taskSchema.pre('save', function (next) {
    this._wasNew = this.isNew;
    next();
});

// Post-save hook: Create notification when a NEW task is assigned
taskSchema.post('save', async function (doc) {
    try {
        // Use the flag we captured in pre-save
        if (this._wasNew) {
            console.log('[Task Hook] Creating notification for new task:', doc.taskName);
            console.log('[Task Hook] AssignedTo:', doc.assignedTo);

            await Notification.create({
                title: 'New Task Assigned',
                body: `You have been assigned: ${doc.taskName}`,
                recipientId: doc.assignedTo,
                type: 'task_assigned',
            });

            console.log('[Task Hook] Notification created successfully');
        }
    } catch (error) {
        console.error('[Task Hook] Error creating task notification:', error);
    }
});

export default mongoose.model("TaskSchema", taskSchema)