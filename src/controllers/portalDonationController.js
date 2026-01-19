import PortalDonation from "../models/PortalDonation.js";
import DonationRequest from "../models/DonationRequest.js";
import AdminWallet from "../models/AdminWallet.js";
import Task from "../models/Task.js";

/**
 * Get all active donation requests (public - no auth required)
 */
export const getPublicDonationRequests = async (req, res) => {
  try {
    const { status, donationType, priority, limit = 20, page = 1 } = req.query;
    
    const filter = {
      status: { $in: ['pending', 'accepted', 'partially_fulfilled'] },
    };
    
    if (donationType) filter.donationType = donationType;
    if (priority) filter.priority = priority;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const requests = await DonationRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    const total = await DonationRequest.countDocuments(filter);
    
    return res.status(200).json({
      success: true,
      data: requests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching public donation requests:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch donation requests',
      error: error.message,
    });
  }
};

/**
 * Get single donation request details (public)
 */
export const getPublicDonationRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await DonationRequest.findById(id).lean();
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Donation request not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Error fetching donation request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch donation request',
      error: error.message,
    });
  }
};

/**
 * Accept a donation request (authenticated user)
 * Creates a PortalDonation with status 'accepted'
 */
export const acceptDonationRequest = async (req, res) => {
  try {
    const { donationRequestId, donationType, amount, itemDetails } = req.body;
    const userId = req.user?._id || req.user?.id;
    
    // Validate donation request exists
    const donationRequest = await DonationRequest.findById(donationRequestId);
    if (!donationRequest) {
      return res.status(404).json({
        success: false,
        message: 'Donation request not found',
      });
    }
    
    // Get user info
    const donorName = req.user?.name || 'Anonymous';
    const donorEmail = req.user?.email;
    const donorPhone = req.user?.phoneNumber;
    
    // Create portal donation
    const portalDonation = await PortalDonation.create({
      donor: userId,
      donorName,
      donorEmail,
      donorPhone,
      donationRequest: donationRequestId,
      donationType: donationType || donationRequest.donationType,
      amount: donationType === 'cash' ? amount : undefined,
      itemDetails: donationType === 'item' ? itemDetails : undefined,
      status: 'accepted',
    });
    
    return res.status(201).json({
      success: true,
      message: 'Donation request accepted successfully',
      data: portalDonation,
    });
  } catch (error) {
    console.error('Error accepting donation request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to accept donation request',
      error: error.message,
    });
  }
};

/**
 * Guest donation (no auth required) - Cash only
 */
export const addGuestDonation = async (req, res) => {
  try {
    const {
      donationRequestId,
      donorName,
      donorEmail,
      donorPhone,
      amount,
      transactionRef,
    } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0',
      });
    }
    
    // Validate donation request if provided
    let donationRequest = null;
    if (donationRequestId) {
      donationRequest = await DonationRequest.findById(donationRequestId);
      if (!donationRequest) {
        return res.status(404).json({
          success: false,
          message: 'Donation request not found',
        });
      }
    }
    
    // Create portal donation (guest - no auth)
    const portalDonation = await PortalDonation.create({
      donor: null, // Anonymous
      donorName: donorName || 'Anonymous',
      donorEmail,
      donorPhone,
      donationRequest: donationRequestId || undefined,
      donationType: 'cash',
      amount,
      status: 'completed', // Cash donations complete immediately (mock)
      transactionRef: transactionRef || `TXN_${Date.now()}`,
      isWalletDonation: !donationRequestId,
    });
    
    // Update donation request if linked
    if (donationRequest) {
      donationRequest.fulfilledAmount = (donationRequest.fulfilledAmount || 0) + amount;
      if (donationRequest.fulfilledAmount >= donationRequest.amount) {
        donationRequest.status = 'completed';
      } else {
        donationRequest.status = 'partially_fulfilled';
      }
      await donationRequest.save();
    }
    
    // If wallet donation, add to admin wallet
    if (!donationRequestId) {
      const wallet = await AdminWallet.getMainWallet();
      await wallet.credit(
        amount,
        'Guest donation to relief fund',
        portalDonation._id,
        donorName || 'Anonymous'
      );
    }
    
    return res.status(201).json({
      success: true,
      message: 'Thank you for your donation!',
      data: portalDonation,
    });
  } catch (error) {
    console.error('Error processing guest donation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process donation',
      error: error.message,
    });
  }
};

/**
 * Submit cash payment (Flow A - Monetary)
 */
export const submitCashDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, transactionRef } = req.body;
    const userId = req.user?._id || req.user?.id;
    
    const portalDonation = await PortalDonation.findById(id);
    
    if (!portalDonation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }
    
    // Verify ownership
    if (portalDonation.donor && portalDonation.donor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this donation',
      });
    }
    
    // Update donation
    portalDonation.amount = amount;
    portalDonation.transactionRef = transactionRef || `TXN_${Date.now()}`;
    portalDonation.status = 'completed'; // Cash donations complete immediately
    await portalDonation.save();
    
    // Update linked donation request
    if (portalDonation.donationRequest) {
      const donationRequest = await DonationRequest.findById(portalDonation.donationRequest);
      if (donationRequest) {
        donationRequest.fulfilledAmount = (donationRequest.fulfilledAmount || 0) + amount;
        if (donationRequest.fulfilledAmount >= donationRequest.amount) {
          donationRequest.status = 'completed';
        } else {
          donationRequest.status = 'partially_fulfilled';
        }
        await donationRequest.save();
      }
    }
    
    return res.status(200).json({
      success: true,
      message: 'Payment completed successfully!',
      data: portalDonation,
    });
  } catch (error) {
    console.error('Error submitting cash donation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: error.message,
    });
  }
};

/**
 * Submit item donation with proof (Flow B - Self Delivery)
 */
export const submitItemDonation = async (req, res) => {
  try {
    const { id } = req.params;
    let { itemDetails, notes } = req.body;
    const userId = req.user?._id || req.user?.id;
    
    // Parse JSON strings if coming from FormData
    if (typeof itemDetails === 'string') {
      try {
        itemDetails = JSON.parse(itemDetails);
      } catch (e) {
        itemDetails = undefined;
      }
    }
    
    const portalDonation = await PortalDonation.findById(id);
    
    if (!portalDonation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }
    
    // Verify ownership
    if (portalDonation.donor && portalDonation.donor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this donation',
      });
    }
    
    // Handle proof image upload
    const proofImage = req.file ? `/uploads/${req.file.filename}` : null;
    
    // Update donation
    if (itemDetails) portalDonation.itemDetails = itemDetails;
    if (proofImage) portalDonation.proofImage = proofImage;
    if (notes) portalDonation.notes = notes;
    portalDonation.deliveryMethod = 'self_delivery';
    portalDonation.status = 'submitted'; // Pending admin validation
    await portalDonation.save();
    
    return res.status(200).json({
      success: true,
      message: 'Donation submitted! Pending admin verification.',
      data: portalDonation,
    });
  } catch (error) {
    console.error('Error submitting item donation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit donation',
      error: error.message,
    });
  }
};

/**
 * Request pickup for item donation (Flow C - Pickup Request)
 * Auto-creates a Task for volunteers
 */
export const requestPickup = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      itemDetails,
      pickupAddress,
      pickupLocation,
      pickupDate,
      pickupNotes,
    } = req.body;
    const userId = req.user?._id || req.user?.id;
    
    // Parse JSON strings if coming from FormData
    if (typeof pickupAddress === 'string') {
      try {
        pickupAddress = JSON.parse(pickupAddress);
      } catch (e) {
        // Keep as string if not valid JSON
      }
    }
    if (typeof pickupLocation === 'string') {
      try {
        pickupLocation = JSON.parse(pickupLocation);
      } catch (e) {
        pickupLocation = undefined;
      }
    }
    if (typeof itemDetails === 'string') {
      try {
        itemDetails = JSON.parse(itemDetails);
      } catch (e) {
        itemDetails = undefined;
      }
    }
    
    const portalDonation = await PortalDonation.findById(id);
    
    if (!portalDonation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }
    
    // Verify ownership
    if (portalDonation.donor && portalDonation.donor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this donation',
      });
    }
    
    // Handle proof image upload
    const proofImage = req.file ? `/uploads/${req.file.filename}` : null;
    
    // Build task data - location is optional
    const taskData = {
      taskName: `Pickup donation from ${portalDonation.donorName}`,
      taskType: 'donation',
      status: 'open', // Available for volunteers to claim
      priority: 'medium',
      volunteersNeeded: 1,
      donationRequest: portalDonation.donationRequest,
    };
    
    // Only add location if valid GeoJSON coordinates provided
    if (pickupLocation && pickupLocation.coordinates && Array.isArray(pickupLocation.coordinates)) {
      taskData.location = {
        type: 'Point',
        coordinates: pickupLocation.coordinates,
      };
    }
    
    // Auto-create pickup task for volunteers
    const task = await Task.create(taskData);
    
    // Update portal donation
    if (itemDetails) portalDonation.itemDetails = itemDetails;
    if (proofImage) portalDonation.proofImage = proofImage;
    portalDonation.deliveryMethod = 'pickup_requested';
    portalDonation.pickupAddress = pickupAddress;
    portalDonation.pickupLocation = pickupLocation;
    portalDonation.pickupDate = pickupDate ? new Date(pickupDate) : undefined;
    portalDonation.pickupNotes = pickupNotes;
    portalDonation.pickupTask = task._id;
    portalDonation.status = 'pickup_requested';
    await portalDonation.save();
    
    return res.status(200).json({
      success: true,
      message: 'Pickup requested! A volunteer will contact you soon.',
      data: {
        donation: portalDonation,
        task,
      },
    });
  } catch (error) {
    console.error('Error requesting pickup:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to request pickup',
      error: error.message,
    });
  }
};

/**
 * Cancel a donation (only if not completed)
 */
export const cancelDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;
    
    const portalDonation = await PortalDonation.findById(id);
    
    if (!portalDonation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }
    
    // Verify ownership
    if (portalDonation.donor && portalDonation.donor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this donation',
      });
    }
    
    // Can't cancel completed donations
    if (portalDonation.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed donation',
      });
    }
    
    // Cancel linked pickup task if exists
    if (portalDonation.pickupTask) {
      await Task.findByIdAndUpdate(portalDonation.pickupTask, {
        status: 'cancelled',
      });
    }
    
    portalDonation.status = 'cancelled';
    await portalDonation.save();
    
    return res.status(200).json({
      success: true,
      message: 'Donation cancelled',
      data: portalDonation,
    });
  } catch (error) {
    console.error('Error cancelling donation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to cancel donation',
      error: error.message,
    });
  }
};

/**
 * Get donor's donations (My Donations)
 */
export const getMyDonations = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const { status, limit = 20, page = 1 } = req.query;
    
    const filter = { donor: userId };
    if (status) filter.status = status;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const donations = await PortalDonation.find(filter)
      .populate('donationRequest')
      .populate('pickupTask')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    const total = await PortalDonation.countDocuments(filter);
    
    // Get status counts for dashboard
    const statusCounts = await PortalDonation.aggregate([
      { $match: { donor: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    
    const counts = {
      accepted: 0,
      submitted: 0,
      pickup_requested: 0,
      pickup_accepted: 0,
      completed: 0,
      cancelled: 0,
    };
    statusCounts.forEach(s => {
      counts[s._id] = s.count;
    });
    
    return res.status(200).json({
      success: true,
      data: donations,
      counts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching my donations:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch donations',
      error: error.message,
    });
  }
};

/**
 * Get single donation details
 */
export const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;
    
    const donation = await PortalDonation.findById(id)
      .populate('donationRequest')
      .populate('pickupTask')
      .lean();
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found',
      });
    }
    
    // Verify ownership (unless admin)
    if (donation.donor && donation.donor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this donation',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error('Error fetching donation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch donation',
      error: error.message,
    });
  }
};
