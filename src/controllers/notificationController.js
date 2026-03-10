import Notification from '../models/Notification.js';
import mongoose from 'mongoose';

// GET /api/public/notifications - Get notifications for logged-in user
export const getNotifications = async (req, res) => {
  try {
    // Use req.user.id (from JWT) - convert to ObjectId for MongoDB queries
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const userRole = req.user.role || 'public'; // Get user role from JWT

    console.log('========== GET NOTIFICATIONS ==========');
    console.log('User ID:', userId);
    console.log('User Role:', userRole);

    // Fetch notifications where:
    // 1. recipientId matches user OR recipientId is null (broadcast)
    // 2. AND targetUserType matches user role OR is 'all'
    const notifications = await Notification.find({
      $and: [
        { $or: [{ recipientId: userId }, { recipientId: null }] },
        { $or: [{ targetUserType: userRole }, { targetUserType: 'all' }] },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    console.log('Found notifications:', notifications.length);

    // Transform notifications to include isRead status
    const transformedNotifications = notifications.map((notification) => {
      const isBroadcast = notification.recipientId === null;

      let isRead;
      if (isBroadcast) {
        isRead = notification.isReadByAll === true;
      } else {
        isRead =
          notification.readBy?.some(
            (id) => id.toString() === userId.toString()
          ) ?? false;
      }

      return {
        ...notification,
        isRead,
      };
    });

    console.log('========================================');

    res.status(200).json({
      success: true,
      count: transformedNotifications.length,
      data: transformedNotifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
    });
  }
};

// PUT /api/public/notifications/read-all - Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const userRole = req.user.role || 'public';

    console.log('========== MARK ALL NOTIFICATIONS AS READ ==========');
    console.log('User ID:', userId);
    console.log('User Role:', userRole);

    // Find all unread notifications for this user
    const notifications = await Notification.find({
      $and: [
        { $or: [{ recipientId: userId }, { recipientId: null }] },
        { $or: [{ targetUserType: userRole }, { targetUserType: 'all' }] },
      ],
    });

    let updatedCount = 0;

    for (const notification of notifications) {
      const isBroadcast = notification.recipientId === null;

      if (isBroadcast) {
        // For broadcasts, check if not already read by all
        if (!notification.isReadByAll) {
          await Notification.findByIdAndUpdate(notification._id, {
            isReadByAll: true,
          });
          updatedCount++;
        }
      } else {
        // For individual notifications, add user to readBy if not already there
        const isAlreadyRead = notification.readBy?.some(
          (id) => id.toString() === userId.toString()
        );
        if (!isAlreadyRead) {
          await Notification.findByIdAndUpdate(notification._id, {
            $addToSet: { readBy: userId },
          });
          updatedCount++;
        }
      }
    }

    console.log('Marked', updatedCount, 'notifications as read');
    console.log('====================================================');

    res.status(200).json({
      success: true,
      message: `Marked ${updatedCount} notifications as read`,
      updatedCount,
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notifications as read',
    });
  }
};

// PUT /api/public/notifications/:id/read - Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const existingNotification = await Notification.findOne({
      _id: id,
      $or: [{ recipientId: userId }, { recipientId: null }],
    });

    if (!existingNotification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
    }

    let notification;
    const isBroadcast = existingNotification.recipientId === null;

    if (isBroadcast) {
      notification = await Notification.findByIdAndUpdate(
        id,
        { isReadByAll: true },
        { new: true }
      ).lean();
    } else {
      notification = await Notification.findByIdAndUpdate(
        id,
        { $addToSet: { readBy: userId } },
        { new: true }
      ).lean();
    }

    res.status(200).json({
      success: true,
      data: {
        ...notification,
        isRead: true,
      },
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
    });
  }
};
