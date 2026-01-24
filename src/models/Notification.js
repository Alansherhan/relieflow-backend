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
      default: null, // null means broadcast to all users of targetUserType
    },
    type: {
      type: String,
      required: true,
      enum: [
        // Volunteer notifications
        'task_assigned',
        'task_open_broadcast',
        'aid_request_in_progress',
        
        // Public user notifications
        'aid_request_submitted',
        'aid_request_accepted',
        'aid_request_rejected',
        'aid_request_completed',
        'donation_request_submitted',
        'donation_request_accepted',
        'donation_request_rejected',
        'donation_request_completed',
        'donation_request_partially_fulfilled',
        
        // Shared notifications
        'admin_broadcast',
        'weather_alert',
        'disaster_alert',
        'relief_center_update',
        'system_notification',
      ],
      default: 'admin_broadcast',
    },
    // Target user type: 'volunteer', 'public', or 'all'
    targetUserType: {
      type: String,
      enum: ['volunteer', 'public', 'all'],
      default: 'all',
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
