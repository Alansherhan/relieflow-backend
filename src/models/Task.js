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
    }
})

// Mongoose hook: Create notification when a new task is assigned
taskSchema.post('save', async function (doc) {
    try {
        // Only create notification for new documents
        if (doc.isNew !== false) {
            await Notification.create({
                title: 'New Task Assigned',
                body: `You have been assigned: ${doc.taskName}`,
                recipientId: doc.assignedTo,
                type: 'task_assigned',
            });
        }
    } catch (error) {
        console.error('Error creating task notification:', error);
    }
});

export default mongoose.model("TaskSchema", taskSchema)