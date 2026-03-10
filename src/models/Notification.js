import mongoose from 'mongoose';
import userProfile from './userProfile.js';
import { sendToUser, sendToRole } from '../services/fcmService.js';

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
        
        // Portal donation notifications
        'donation_approved',
        'donation_submitted',
        
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
    // Extra data to include in FCM push (e.g., taskId, aidRequestId)
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    // Skip FCM sending (for migrations, tests, bulk imports)
    skipFcm: {
      type: Boolean,
      default: false,
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

// ============================================
// CENTRALIZED FCM SENDING VIA POST-SAVE HOOK
// ============================================

// Pre-save hook: track if document is new
notificationSchema.pre('save', function(next) {
  this._wasNew = this.isNew;
  next();
});

// Post-save hook: automatically send FCM push notification
notificationSchema.post('save', async function(doc) {
  // Only run for newly created documents
  if (!this._wasNew) return;
  
  // Respect skipFcm flag (for migrations, tests, bulk operations)
  if (doc.skipFcm) {
    console.log(`[Notification Hook] Skipping FCM for notification ${doc._id} (skipFcm=true)`);
    return;
  }
  
  // Build FCM payload
  const pushData = {
    title: doc.title,
    body: doc.body,
    data: {
      type: doc.type,
      notificationId: doc._id.toString(),
      ...doc.data, // Merge any extra data (taskId, aidRequestId, etc.)
    },
  };
  
  // Send asynchronously (non-blocking)
  setImmediate(async () => {
    try {
      if (doc.recipientId) {
        // Targeted notification to specific user
        const result = await sendToUser(doc.recipientId, pushData);
        console.log(`[Notification Hook] FCM sent to user ${doc.recipientId}:`, result.success ? 'success' : result.reason || 'failed');
      } else {
        // Broadcast notification to role
        const targetRole = doc.targetUserType || 'all';
        const result = await sendToRole(targetRole, pushData);
        console.log(`[Notification Hook] FCM broadcast to ${targetRole}:`, result.success ? `${result.sent} sent` : 'failed');
      }
    } catch (error) {
      console.error(`[Notification Hook] FCM send error for notification ${doc._id}:`, error.message);
      // Don't throw - notification is saved, FCM is best-effort
    }
  });
});

export default mongoose.model('Notification', notificationSchema);
