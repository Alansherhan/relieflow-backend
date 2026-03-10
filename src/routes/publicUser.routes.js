import {
  deleteUser,
  login,
  signUp,
  updateProfile,
  getUserProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from '../controllers/userProfileController.js';
import { getAllCalamityTypes } from '../controllers/calamityTypeController.js';
import {
  addDonationRequest,
  deletedDonationRequest,
  getAllDonationRequests,
  updateDonationRequest,
} from '../controllers/donationRequestController.js';
import {
  addAidRequest,
  getMyAidRequests,
  updateAidRequestByUser,
  deleteAidRequestByUser,
} from '../controllers/aidRequestController.js';
import { getAllReliefCenters } from '../controllers/reliefCenterController.js';
import { protect } from '../middleWare/authMiddleware.js';
import { validate } from '../middleWare/validate.js';
import { signupSchema, loginSchema } from '../validator/shared/auth.js';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validator/shared/passwordReset.js';
import { group } from '../utils/routerUtils.js';
import upload from '../middleWare/upload.js';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from '../controllers/notificationController.js';
import {
  registerFcmToken,
  unregisterFcmToken,
} from '../controllers/fcmController.js';
import {
  getMyTasks,
  updateTaskStatus,
  completeTaskWithProof,
  getOpenTasks,
  claimTask,
  getTaskById,
} from '../controllers/taskController.js';
import { aidSchema } from '../validator/request/aid.js';
import { donationSchema } from '../validator/request/donation.js';
export function publicUserRoutes(router) {
  router.post('/signup', validate(signupSchema), signUp);
  router.post('/login', validate(loginSchema), login);
  router.post(
    '/forgot-password',
    validate(forgotPasswordSchema),
    forgotPassword
  );
  router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
  router.get('/profile', protect(['public', 'volunteer']), getUserProfile);
  router.put(
    '/update',
    protect(),
    upload.single('profile_image'), // <--- THIS LINE IS CRITICAL
    updateProfile
  );
  // router.put('/update/:id',updateProfile)
  router.delete('/delete/:id', deleteUser);
  router.put('/change-password', protect(), changePassword);

  // Public endpoint for calamity types (no auth required)
  router.get('/calamity-types', getAllCalamityTypes);
  router.get('/relief-centers', getAllReliefCenters);
  group(
    '/donation',
    (rootRouter) => {
      rootRouter.use(protect(['public']));
      rootRouter.post(
        '/request/add',
        upload.array('proofImages'),
        validate(donationSchema),
        addDonationRequest
      );
      rootRouter.get('/request/', getAllDonationRequests);
      rootRouter.put(
        '/update-donation/:id',
        upload.array('proofImages'),
        updateDonationRequest
      );
      rootRouter.delete('/delete/:id', deletedDonationRequest);
    },
    router
  );

  // Notification routes for public users and volunteers
  router.get(
    '/notifications',
    protect(['public', 'volunteer']),
    getNotifications
  );
  router.put(
    '/notifications/read-all',
    protect(['public', 'volunteer']),
    markAllAsRead
  );
  router.put(
    '/notifications/:id/read',
    protect(['public', 'volunteer']),
    markAsRead
  );

  // FCM token routes for push notifications
  router.post(
    '/fcm/register',
    protect(['public', 'volunteer']),
    registerFcmToken
  );
  router.delete(
    '/fcm/unregister',
    protect(['public', 'volunteer']),
    unregisterFcmToken
  );

  // Task routes for volunteers
  router.get('/tasks', protect(['volunteer']), getMyTasks);
  router.get('/tasks/open', protect(['volunteer']), getOpenTasks); // Get available tasks
  router.get('/tasks/:id', protect(['volunteer']), getTaskById); // Get single task by ID
  router.post('/tasks/:id/claim', protect(['volunteer']), claimTask); // Claim an open task

  router.put('/tasks/:id/status', protect(['volunteer']), updateTaskStatus);
  router.put(
    '/tasks/:id/complete',
    protect(['volunteer']),
    upload.single('proofImage'),
    completeTaskWithProof
  );

  // Aid request routes for public users
  group(
    '/aid',
    (rootRouter) => {
      rootRouter.use(protect(['public']));
      rootRouter.post(
        '/request/add',
        upload.single('image'),
        validate(aidSchema),
        addAidRequest
      );
      rootRouter.get('/request/', getMyAidRequests);
      rootRouter.put(
        '/request/:id',
        upload.single('image'),
        updateAidRequestByUser
      );
      rootRouter.delete('/request/:id', deleteAidRequestByUser);
    },
    router
  );
}
