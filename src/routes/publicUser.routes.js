import {
  deleteUser,
  login,
  signUp,
  updateProfile,
  getUserProfile,
  changePassword,
} from '../controllers/userProfileController.js';
import { getAllCalamityTypes } from '../controllers/calamityTypeController.js';
import {
  addDonationRequest,
  deletedDonationRequest,
  getAllDonationRequests,
  updateDonationRequest,
} from '../controllers/donationRequestController.js';
import {
  addDonation,
  getAllDonations,
  getDonationsForRequest,
} from '../controllers/donationController.js';
import {
  addAidRequest,
  getMyAidRequests,
} from '../controllers/aidRequestController.js';
import { getAllReliefCenters } from '../controllers/reliefCenterController.js';
import { protect } from '../middleWare/authMiddleware.js';
import { validate } from '../middleWare/validate.js';
import { signupSchema, loginSchema } from '../validator/auth.js';
import { group } from '../utils/routerUtils.js';
import upload from '../middleWare/upload.js';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { registerFcmToken, unregisterFcmToken } from '../controllers/fcmController.js';
import { getMyTasks, updateTaskStatus, completeTaskWithProof, getOpenTasks, claimTask } from '../controllers/taskController.js';

export function publicUserRoutes(router) {
  router.post('/signup', validate(signupSchema), signUp);
  router.post('/login', validate(loginSchema), login);
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
      rootRouter.post('/request/add', upload.array('proofImages'), addDonationRequest);
      rootRouter.get('/request/', getAllDonationRequests);
      rootRouter.put('/update-donation/:id', updateDonationRequest);
      rootRouter.delete('/delete/:id', deletedDonationRequest);

      rootRouter.post('/donate', addDonation);
      rootRouter.get('/', getAllDonations);
      rootRouter.get('/request/:requestId/donations', getDonationsForRequest);
    },
    router
  );

  // Notification routes for public users and volunteers
  router.get('/notifications', protect(['public', 'volunteer']), getNotifications);
  router.put('/notifications/:id/read', protect(['public', 'volunteer']), markAsRead);

  // FCM token routes for push notifications
  router.post('/fcm/register', protect(['public', 'volunteer']), registerFcmToken);
  router.delete('/fcm/unregister', protect(['public', 'volunteer']), unregisterFcmToken);

  // Task routes for volunteers
  router.get('/tasks', protect(['volunteer']), getMyTasks);
  router.get('/tasks/open', protect(['volunteer']), getOpenTasks); // Get available tasks
  router.post('/tasks/:id/claim', protect(['volunteer']), claimTask); // Claim an open task

  router.put('/tasks/:id/status', protect(['volunteer']), updateTaskStatus);
  router.put('/tasks/:id/complete', protect(['volunteer']), upload.single('proofImage'), completeTaskWithProof);

  // Aid request routes for public users
  group(
    '/aid',
    (rootRouter) => {
      rootRouter.use(protect(['public']));
      rootRouter.post('/request/add', upload.single('image'), addAidRequest);
      rootRouter.get('/request/', getMyAidRequests);
    },
    router
  );
}
