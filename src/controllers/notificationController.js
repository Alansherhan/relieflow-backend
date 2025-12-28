import Notification from '../models/Notification.js';

// GET /api/public/notifications - Get notifications for logged-in user
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch notifications where recipientId matches user OR recipientId is null (broadcast)
        const notifications = await Notification.find({
            $or: [{ recipientId: userId }, { recipientId: null }],
        })
            .sort({ createdAt: -1 })
            .limit(50)
            .lean(); // Use lean() for better performance since we're transforming data

        // Transform notifications to include per-user isRead status
        const transformedNotifications = notifications.map((notification) => ({
            ...notification,
            // isRead is true if the current user's ID is in the readBy array
            isRead: notification.readBy?.some(
                (id) => id.toString() === userId.toString()
            ) ?? false,
        }));

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

// PUT /api/public/notifications/:id/read - Mark notification as read for current user
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Add user to readBy array if not already present (using $addToSet to prevent duplicates)
        const notification = await Notification.findOneAndUpdate(
            {
                _id: id,
                $or: [{ recipientId: userId }, { recipientId: null }],
            },
            { $addToSet: { readBy: userId } }, // Add userId to readBy array (no duplicates)
            { new: true }
        ).lean();

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
            });
        }

        // Return with computed isRead for this user
        res.status(200).json({
            success: true,
            data: {
                ...notification,
                isRead: true, // Since we just marked it, it's definitely read
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
