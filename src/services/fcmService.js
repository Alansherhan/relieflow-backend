import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import userProfile from '../models/userProfile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK
let firebaseInitialized = false;

const initializeFirebase = () => {
    if (firebaseInitialized) return;

    try {
        let serviceAccount;

        // Try loading from env var first (production/Render)
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            console.log('Firebase: Loading credentials from environment variable');
        } else {
            // Fallback to local file (development)
            const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');
            serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
            console.log('Firebase: Loading credentials from local file');
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        firebaseInitialized = true;
        console.log('Firebase Admin SDK initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Firebase Admin SDK:', error.message);
    }
};

// Initialize on module load
initializeFirebase();

/**
 * Send push notification to a specific user by their user ID
 * @param {string} userId - MongoDB user ID
 * @param {object} notification - { title, body, data? }
 */
export const sendToUser = async (userId, notification) => {
    try {
        console.log(`[FCM] Attempting to send push to user: ${userId}`, { notification });
        const user = await userProfile.findById(userId).select('fcmToken');

        if (!user?.fcmToken) {
            console.warn(`[FCM] No FCM token found for user ${userId}`);
            return { success: false, reason: 'no_token' };
        }
        console.log(`[FCM] Found token for user ${userId}: ${user.fcmToken.substring(0, 10)}...`);

        // Ensure data values are strings (FCM requirement)
        const stringifiedData = {};
        if (notification.data) {
            Object.keys(notification.data).forEach(key => {
                stringifiedData[key] = String(notification.data[key]);
            });
        }

        const message = {
            token: user.fcmToken,
            notification: {
                title: notification.title,
                body: notification.body,
            },
            data: stringifiedData,
            android: {
                priority: 'high',
                notification: {
                    sound: 'default',
                    channelId: 'relief_notifications',
                    priority: 'high',
                    visibility: 'public',
                    defaultSound: true,
                    defaultVibrateTimings: true,
                },
            },
            apns: {
                payload: {
                    aps: {
                        alert: {
                            title: notification.title,
                            body: notification.body,
                        },
                        sound: 'default',
                        badge: 1,
                        'content-available': 1,
                    },
                },
            },
        };

        const response = await admin.messaging().send(message);
        console.log(`[FCM] Push notification sent successfully to user ${userId}. Message ID: ${response}`);
        return { success: true, messageId: response };
    } catch (error) {
        console.error(`[FCM] Error sending push to user ${userId}:`, error);

        // Handle invalid token - remove it from database
        if (error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered') {
            await userProfile.findByIdAndUpdate(userId, { fcmToken: null });
            console.warn(`[FCM] Removed invalid FCM token for user ${userId}`);
        }

        return { success: false, error: error.message, code: error.code };
    }
};

/**
 * Send push notification to multiple users
 * @param {string[]} userIds - Array of MongoDB user IDs
 * @param {object} notification - { title, body, data? }
 */
export const sendToMultipleUsers = async (userIds, notification) => {
    const results = await Promise.allSettled(
        userIds.map(userId => sendToUser(userId, notification))
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    console.log(`Push notifications: ${successful} sent, ${failed} failed`);
    return { successful, failed, total: results.length };
};

/**
 * Send push notification to all users with a specific role
 * @param {string} role - 'public', 'volunteer', or 'all'
 * @param {object} notification - { title, body, data? }
 */
export const sendToRole = async (role, notification) => {
    try {
        console.log(`[FCM] Sending multicast to role: ${role}`, { notification });
        const query = role === 'all'
            ? { fcmToken: { $ne: null } }
            : { role, fcmToken: { $ne: null } };

        const users = await userProfile.find(query).select('_id fcmToken');

        if (users.length === 0) {
            console.warn(`[FCM] No users found with tokens for role: ${role}`);
            return { success: true, sent: 0 };
        }
        console.log(`[FCM] Found ${users.length} users with tokens for role: ${role}`);

        // Get all tokens
        const tokens = users.map(u => u.fcmToken).filter(Boolean);

        if (tokens.length === 0) {
            return { success: true, sent: 0 };
        }

        // Ensure data values are strings (FCM requirement)
        const stringifiedData = {};
        if (notification.data) {
            Object.keys(notification.data).forEach(key => {
                stringifiedData[key] = String(notification.data[key]);
            });
        }

        // Send multicast message
        const message = {
            tokens,
            notification: {
                title: notification.title,
                body: notification.body,
            },
            data: stringifiedData,
            android: {
                priority: 'high',
                notification: {
                    sound: 'default',
                    channelId: 'relief_notifications',
                    priority: 'high',
                    visibility: 'public',
                    defaultSound: true,
                    defaultVibrateTimings: true,
                },
            },
            apns: {
                payload: {
                    aps: {
                        alert: {
                            title: notification.title,
                            body: notification.body,
                        },
                        sound: 'default',
                        badge: 1,
                        'content-available': 1,
                    },
                },
            },
        };

        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`[FCM] Multicast sent to ${role}: ${response.successCount} success, ${response.failureCount} failed`);

        // Handle failed tokens
        if (response.failureCount > 0) {
            console.warn(`[FCM] Multicast failures:`, response.responses.filter(r => !r.success).map(r => r.error));
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                    // console.log(`[FCM] Failed token details:`, tokens[idx], resp.error);
                }
            });
            // Optionally clean up invalid tokens here
        }

        return { success: true, sent: response.successCount, failed: response.failureCount };
    } catch (error) {
        console.error(`Error sending multicast to role ${role}:`, error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Register or update FCM token for a user
 * @param {string} userId - MongoDB user ID
 * @param {string} token - FCM device token
 */
export const registerToken = async (userId, token) => {
    try {
        console.log(`[FCM] Registering token for user: ${userId}`);
        const updatedUser = await userProfile.findByIdAndUpdate(userId, { fcmToken: token }, { new: true });
        if (updatedUser) {
            console.log(`[FCM] FCM token successfully registered for user ${userId}`);
        } else {
            console.warn(`[FCM] User ${userId} not found during token registration`);
        }
        return { success: true };
    } catch (error) {
        console.error(`[FCM] Error registering FCM token for user ${userId}:`, error);
        return { success: false, error: error.message };
    }
};

export default {
    sendToUser,
    sendToMultipleUsers,
    sendToRole,
    registerToken,
};
