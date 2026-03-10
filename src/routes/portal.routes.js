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
import { protect, optionalProtect } from '../middleWare/authMiddleware.js';
import upload from '../middleWare/upload.js';
import PortalDonation from '../models/PortalDonation.js';

const router = Router();

// ==========================================
// PUBLIC ROUTES (No Authentication Required)
// ==========================================

// Browse donation requests
router.get('/public/donation-requests', getPublicDonationRequests);
router.get('/public/donation-requests/:id', optionalProtect(), getPublicDonationRequestById);

// Wallet info (public display)
router.get('/public/wallet-info', getWalletInfo);

// Guest donations (anonymous cash)
router.post('/public/donate', addGuestDonation);
router.post('/public/donate-wallet', guestDonateToWallet);

// Public receipt endpoint (for download after donation)
router.get('/public/donation/:id/receipt', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    const mongoose = await import('mongoose');
    if (!mongoose.default.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid donation ID',
      });
    }
    
    const donation = await PortalDonation.findById(id)
      .populate('donationRequest', 'title')
      .lean();
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }
    
    // Return only safe receipt data (no sensitive info)
    return res.status(200).json({
      success: true,
      data: {
        _id: donation._id,
        donorName: donation.donorName,
        donorEmail: donation.donorEmail,
        donationType: donation.donationType,
        amount: donation.amount,
        itemDetails: donation.itemDetails,
        transactionRef: donation.transactionRef,
        status: donation.status,
        createdAt: donation.createdAt,
        donationRequest: donation.donationRequest,
        isWalletDonation: donation.isWalletDonation,
      },
    });
  } catch (error) {
    console.error('Error fetching receipt:', error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch receipt',
      error: error.message,
    });
  }
});

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
