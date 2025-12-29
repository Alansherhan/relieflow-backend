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
import { protect } from '../middleWare/authMiddleware.js';
import { group } from '../utils/routerUtils.js';
import upload from '../middleWare/upload.js';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';

export function publicUserRoutes(router) {
  router.post('/signup', signUp);
  router.post('/login', login);
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
  group(
    '/donation',
    (rootRouter) => {
      rootRouter.use(protect(['public']));
      rootRouter.post('/request/add', addDonationRequest);
      rootRouter.get('/request/', getAllDonationRequests);
      rootRouter.put('/update-donation/:id', updateDonationRequest);
      rootRouter.delete('/delete/:id', deletedDonationRequest);

      rootRouter.post('/donate', addDonation);
      rootRouter.get('/', getAllDonations);
      rootRouter.get('/request/:requestId/donations', getDonationsForRequest);
    },
    router
  );

  // Notification routes for volunteers
  router.get('/notifications', protect(['volunteer']), getNotifications);
  router.put('/notifications/:id/read', protect(['volunteer']), markAsRead);

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
