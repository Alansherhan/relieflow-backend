import { registerToken } from '../services/fcmService.js';

/**
 * POST /api/public/fcm/register
 * Register or update FCM token for the authenticated user
 */
export const registerFcmToken = async (req, res) => {
    try {
        const userId = req.user.id;
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'FCM token is required',
            });
        }

        console.log(`Registering FCM token for user ${userId}`);

        const result = await registerToken(userId, token);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'FCM token registered successfully',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to register FCM token',
            });
        }
    } catch (error) {
        console.error('Error in registerFcmToken:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

/**
 * DELETE /api/public/fcm/unregister
 * Remove FCM token for the authenticated user (on logout)
 */
export const unregisterFcmToken = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log(`Unregistering FCM token for user ${userId}`);

        const result = await registerToken(userId, null);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'FCM token unregistered successfully',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to unregister FCM token',
            });
        }
    } catch (error) {
        console.error('Error in unregisterFcmToken:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
