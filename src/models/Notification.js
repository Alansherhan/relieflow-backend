import mongoose from 'mongoose';
import userProfile from './userProfile.js';

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    recipientId: {
      type: mongoose.Types.ObjectId,
      ref: userProfile.modelName,
      default: null, // null means broadcast to all volunteers
    },
    type: {
      type: String,
      required: true,
      enum: ['task_assigned', 'admin_broadcast'],
      default: 'admin_broadcast',
    },
    // Array of user IDs who have read this notification (for targeted notifications)
    readBy: [{
      type: mongoose.Types.ObjectId,
      ref: userProfile.modelName,
    }],
    // For broadcasts: when true, notification is read for ALL users
    isReadByAll: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Virtual for recipient details
notificationSchema.virtual('recipient', {
  ref: userProfile.modelName,
  localField: 'recipientId',
  foreignField: '_id',
  justOne: true,
});

notificationSchema.set('toJSON', { virtuals: true });
notificationSchema.set('toObject', { virtuals: true });

export default mongoose.model('Notification', notificationSchema);
