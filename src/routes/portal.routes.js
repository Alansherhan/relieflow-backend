import { Router } from 'express';
import {
  getPublicDonationRequests,
  getPublicDonationRequestById,
  acceptDonationRequest,
  addGuestDonation,
  submitCashDonation,
  submitItemDonation,
  requestPickup,
  cancelDonation,
  getMyDonations,
  getDonationById,
} from '../controllers/portalDonationController.js';
import {
  getWalletInfo,
  donateToWallet,
  guestDonateToWallet,
} from '../controllers/walletController.js';
import { protect } from '../middleWare/authMiddleware.js';
import upload from '../middleWare/upload.js';

const router = Router();

// ==========================================
// PUBLIC ROUTES (No Authentication Required)
// ==========================================

// Browse donation requests
router.get('/public/donation-requests', getPublicDonationRequests);
router.get('/public/donation-requests/:id', getPublicDonationRequestById);

// Wallet info (public display)
router.get('/public/wallet-info', getWalletInfo);

// Guest donations (anonymous cash)
router.post('/public/donate', addGuestDonation);
router.post('/public/donate-wallet', guestDonateToWallet);

// ==========================================
// AUTHENTICATED ROUTES (Login Required)
// ==========================================

// Accept a donation request
router.post(
  '/donation/accept',
  protect(['public', 'volunteer']),
  acceptDonationRequest
);

// Submit cash payment (Flow A)
router.put(
  '/donation/:id/submit-cash',
  protect(['public', 'volunteer']),
  submitCashDonation
);

// Submit item donation with proof (Flow B)
router.put(
  '/donation/:id/submit-item',
  protect(['public', 'volunteer']),
  upload.single('proofImage'),
  submitItemDonation
);

// Request pickup (Flow C)
router.put(
  '/donation/:id/request-pickup',
  protect(['public', 'volunteer']),
  upload.single('proofImage'),
  requestPickup
);

// Cancel donation
router.put(
  '/donation/:id/cancel',
  protect(['public', 'volunteer']),
  cancelDonation
);

// Get my donations (history)
router.get(
  '/my-donations',
  protect(['public', 'volunteer']),
  getMyDonations
);

// Get single donation details
router.get(
  '/donation/:id',
  protect(['public', 'volunteer']),
  getDonationById
);

// Donate to admin wallet (authenticated)
router.post(
  '/donate-wallet',
  protect(['public', 'volunteer']),
  donateToWallet
);

export default router;
