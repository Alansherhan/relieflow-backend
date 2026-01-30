import mongoose from 'mongoose';
import PortalDonation from '../models/PortalDonation.js';
import DonationRequest from '../models/DonationRequest.js';
import AdminWallet from '../models/AdminWallet.js';
import Task from '../models/Task.js';
import Notification from '../models/Notification.js';
// FCM is now sent automatically via Notification model post-save hook

/**
 * Get all active donation requests (public - no auth required)
 */
export const getPublicDonationRequests = async (req, res) => {
  try {
    const {
      status,
      donationType,
      priority,
      search,
      limit = 20,
      page = 1,
    } = req.query;

    const filter = {
      status: { $in: ['accepted', 'partially_fulfilled'] },
    };

    if (donationType) filter.donationType = donationType;
    if (priority) filter.priority = priority;

    // Server-side search on title and description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

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
 * If authenticated (via optionalProtect), also includes user's active donation for this request
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

    // If user is authenticated, check for their active donation on this request
    let myActiveDonation = null;
    if (req.user) {
      const userId = req.user._id || req.user.id;
      myActiveDonation = await PortalDonation.findOne({
        donor: userId,
        donationRequest: id,
        status: {
          $in: ['pending_payment', 'pending_delivery', 'awaiting_volunteer'],
        },
      }).lean();
    }

    return res.status(200).json({
      success: true,
      data: request,
      myActiveDonation, // null if not authenticated or no active donation
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
 * For items: requires deliveryMethod (self_delivery or pickup)
 * For cash: completes immediately
 */
export const acceptDonationRequest = async (req, res) => {
  try {
    const {
      donationRequestId,
      donationType,
      amount,
      itemDetails,
      deliveryMethod, // Required for item donations: 'self_delivery' or 'pickup'
      pickupAddress,
      pickupLocation,
      pickupDate,
      pickupNotes,
    } = req.body;
    const userId = req.user?._id || req.user?.id;

    // Validate donation request exists
    const donationRequest = await DonationRequest.findById(donationRequestId);
    if (!donationRequest) {
      return res.status(404).json({
        success: false,
        message: 'Donation request not found',
      });
    }

    const actualDonationType = donationType || donationRequest.donationType;

    // For item donations, deliveryMethod is required
    if (actualDonationType === 'item') {
      if (
        !deliveryMethod ||
        !['self_delivery', 'pickup'].includes(deliveryMethod)
      ) {
        return res.status(400).json({
          success: false,
          message:
            'deliveryMethod is required for item donations (self_delivery or pickup)',
        });
      }
    }

    // Get user info
    const donorName = req.user?.name || 'Anonymous';
    const donorEmail = req.user?.email;
    const donorPhone = req.user?.phoneNumber;

    // Determine status based on donation type and delivery method
    let status;
    if (actualDonationType === 'cash') {
      status = 'pending_payment'; // Cash donations wait for actual payment
    } else if (deliveryMethod === 'self_delivery') {
      status = 'pending_delivery';
    } else {
      status = 'awaiting_volunteer';
    }

    // Create portal donation
    const portalDonation = await PortalDonation.create({
      donor: userId,
      donorName,
      donorEmail,
      donorPhone,
      donationRequest: donationRequestId,
      donationType: actualDonationType,
      amount: actualDonationType === 'cash' ? amount : undefined,
      itemDetails: actualDonationType === 'item' ? itemDetails : undefined,
      deliveryMethod:
        actualDonationType === 'item' ? deliveryMethod : 'not_applicable',
      pickupAddress: deliveryMethod === 'pickup' ? pickupAddress : undefined,
      pickupLocation: deliveryMethod === 'pickup' ? pickupLocation : undefined,
      pickupDate:
        deliveryMethod === 'pickup' && pickupDate
          ? new Date(pickupDate)
          : undefined,
      pickupNotes: deliveryMethod === 'pickup' ? pickupNotes : undefined,
      status,
    });

    // If pickup, create a Task for volunteers
    if (deliveryMethod === 'pickup') {
      const taskData = {
        taskName: `Pickup donation from ${donorName}`,
        taskType: 'donation',
        status: 'open',
        priority: 'medium',
        volunteersNeeded: 1,
        donationRequest: donationRequestId,
      };

      // Add location if provided
      if (
        pickupLocation &&
        pickupLocation.coordinates &&
        Array.isArray(pickupLocation.coordinates)
      ) {
        taskData.location = {
          type: 'Point',
          coordinates: pickupLocation.coordinates,
        };
      }

      const task = await Task.create(taskData);
      portalDonation.pickupTask = task._id;
      await portalDonation.save();
    }

    // Update DonationRequest fulfilled quantities for item donations
    if (
      actualDonationType === 'item' &&
      itemDetails &&
      itemDetails.length > 0
    ) {
      if (donationRequest.itemDetails) {
        itemDetails.forEach((donatedItem) => {
          const requestItem = donationRequest.itemDetails.find(
            (ri) => ri.category === donatedItem.category
          );
          if (requestItem) {
            requestItem.fulfilledQuantity =
              (requestItem.fulfilledQuantity || 0) +
              (donatedItem.quantity || 0);
          }
        });

        // Check fulfillment status
        const allFulfilled = donationRequest.itemDetails.every(
          (item) => (item.fulfilledQuantity || 0) >= item.quantity
        );
        const partiallyFulfilled = donationRequest.itemDetails.some(
          (item) => (item.fulfilledQuantity || 0) > 0
        );

        if (allFulfilled) {
          donationRequest.status = 'completed';
        } else if (partiallyFulfilled) {
          donationRequest.status = 'partially_fulfilled';
        }

        await donationRequest.save();
      }
    }

    // NOTE: For cash donations, we do NOT update fulfilledAmount here.
    // The fulfilledAmount is updated only when actual payment is submitted in submitCashDonation.
    // This allows multiple users to make partial contributions and prevents double-counting.

    // Notify the user who requested the donation
    if (donationRequest.requestedBy) {
      try {
        await Notification.create({
          title: 'Donation Incoming!',
          body: `${donorName} has offered to donate ${actualDonationType === 'cash' ? `₹${amount}` : 'items'} for: ${donationRequest.title}`,
          recipientId: donationRequest.requestedBy,
          type: 'donation_request_accepted',
          data: {
            donationRequestId: donationRequest._id.toString(),
            portalDonationId: portalDonation._id.toString(),
          },
        });
      } catch (error) {
        console.error(
          '[acceptDonationRequest] Failed to create notification:',
          error
        );
      }
    }

    return res.status(201).json({
      success: true,
      message:
        actualDonationType === 'cash'
          ? 'Donation accepted! Please complete your payment.'
          : deliveryMethod === 'pickup'
            ? 'Pickup requested! A volunteer will contact you soon.'
            : 'Donation accepted! Please deliver to the specified location.',
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
      donationRequest.fulfilledAmount =
        (donationRequest.fulfilledAmount || 0) + amount;
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
    if (
      portalDonation.donor &&
      portalDonation.donor.toString() !== userId.toString()
    ) {
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
      const donationRequest = await DonationRequest.findById(
        portalDonation.donationRequest
      );
      if (donationRequest) {
        donationRequest.fulfilledAmount =
          (donationRequest.fulfilledAmount || 0) + amount;
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
    if (
      portalDonation.donor &&
      portalDonation.donor.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this donation',
      });
    }

    // Handle proof image upload
    const proofImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Update donation
    const donatedItems = itemDetails || portalDonation.itemDetails;
    if (itemDetails) portalDonation.itemDetails = itemDetails;
    if (proofImage) portalDonation.proofImage = proofImage;
    if (notes) portalDonation.notes = notes;
    // Status changes to completed (fulfillment qty already updated at accept time)
    portalDonation.status = 'completed';
    await portalDonation.save();

    // START FCM: Notify Donor of successful submission
    // NOTE: FCM is now sent automatically via Notification model post-save hook
    try {
      await Notification.create({
        title: 'Donation Submitted',
        body: 'Thank you! Your donation has been submitted for review.',
        recipientId: userId,
        type: 'system_notification',
        data: { portalDonationId: portalDonation._id.toString() },
      });
    } catch (e) {
      console.error('[submitItemDonation] Failed to create notification:', e);
    }
    // END FCM

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
    if (
      portalDonation.donor &&
      portalDonation.donor.toString() !== userId.toString()
    ) {
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
    if (
      pickupLocation &&
      pickupLocation.coordinates &&
      Array.isArray(pickupLocation.coordinates)
    ) {
      taskData.location = {
        type: 'Point',
        coordinates: pickupLocation.coordinates,
      };
    }

    // Auto-create pickup task for volunteers
    const task = await Task.create(taskData);

    // Update portal donation
    const donatedItems = itemDetails || portalDonation.itemDetails;
    if (itemDetails) portalDonation.itemDetails = itemDetails;
    if (proofImage) portalDonation.proofImage = proofImage;
    portalDonation.deliveryMethod = 'pickup';
    portalDonation.pickupAddress = pickupAddress;
    portalDonation.pickupLocation = pickupLocation;
    portalDonation.pickupDate = pickupDate ? new Date(pickupDate) : undefined;
    portalDonation.pickupNotes = pickupNotes;
    portalDonation.pickupTask = task._id;
    portalDonation.status = 'awaiting_volunteer';
    await portalDonation.save();

    // Update fulfilled quantities on the DonationRequest
    if (
      portalDonation.donationRequest &&
      donatedItems &&
      donatedItems.length > 0
    ) {
      const donationRequest = await DonationRequest.findById(
        portalDonation.donationRequest
      );
      if (donationRequest && donationRequest.itemDetails) {
        // Update fulfilled quantities for each donated item
        donatedItems.forEach((donatedItem) => {
          const requestItem = donationRequest.itemDetails.find(
            (ri) => ri.category === donatedItem.category
          );
          if (requestItem) {
            requestItem.fulfilledQuantity =
              (requestItem.fulfilledQuantity || 0) +
              (donatedItem.quantity || 0);
          }
        });

        // Check if all items are fully fulfilled
        const allFulfilled = donationRequest.itemDetails.every(
          (item) => (item.fulfilledQuantity || 0) >= item.quantity
        );
        const partiallyFulfilled = donationRequest.itemDetails.some(
          (item) => (item.fulfilledQuantity || 0) > 0
        );

        if (allFulfilled) {
          donationRequest.status = 'completed';
        } else if (partiallyFulfilled) {
          donationRequest.status = 'partially_fulfilled';
        }

        await donationRequest.save();
      }
    }

    // START FCM: Notify Donor and Broadcast to Volunteers
    // NOTE: FCM is now sent automatically via Notification model post-save hook
    try {
      // 1. Notify Donor
      await Notification.create({
        title: 'Pickup Requested',
        body: 'Your pickup request has been received. A volunteer will be assigned shortly.',
        recipientId: userId,
        type: 'system_notification',
        data: { taskId: task._id.toString() },
      });

      // 2. Broadcast to Volunteers (New Pickup Task Available)
      await Notification.create({
        title: 'New Pickup Task Available',
        body: `Pickup from ${pickupAddress?.addressLine2 || 'Unknown Location'}`,
        recipientId: null, // null = broadcast
        targetUserType: 'volunteer',
        type: 'task_open_broadcast',
        data: { taskId: task._id.toString() },
      });
    } catch (e) {
      console.error('[requestPickup] Failed to create notifications:', e);
    }
    // END FCM

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
 * Cancel a donation (only if not completed or pickup_scheduled)
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
    if (
      portalDonation.donor &&
      portalDonation.donor.toString() !== userId.toString()
    ) {
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

    // Can't cancel if volunteer already accepted pickup
    if (portalDonation.status === 'pickup_scheduled') {
      return res.status(400).json({
        success: false,
        message:
          'Cannot cancel - a volunteer has already been assigned for pickup',
      });
    }

    // Cancel linked pickup task if exists
    if (portalDonation.pickupTask) {
      await Task.findByIdAndUpdate(portalDonation.pickupTask, {
        status: 'cancelled',
      });
    }

    // Revert fulfilled quantities on DonationRequest
    if (
      portalDonation.donationRequest &&
      portalDonation.donationType === 'item'
    ) {
      const donationRequest = await DonationRequest.findById(
        portalDonation.donationRequest
      );
      if (
        donationRequest &&
        donationRequest.itemDetails &&
        portalDonation.itemDetails
      ) {
        portalDonation.itemDetails.forEach((donatedItem) => {
          const requestItem = donationRequest.itemDetails.find(
            (ri) => ri.category === donatedItem.category
          );
          if (requestItem) {
            requestItem.fulfilledQuantity = Math.max(
              0,
              (requestItem.fulfilledQuantity || 0) - (donatedItem.quantity || 0)
            );
          }
        });

        // Recalculate status
        const anyFulfilled = donationRequest.itemDetails.some(
          (item) => (item.fulfilledQuantity || 0) > 0
        );
        donationRequest.status = anyFulfilled
          ? 'partially_fulfilled'
          : 'accepted';
        await donationRequest.save();
      }
    }

    // Revert cash donation - only if it was completed (payment was processed)
    // pending_payment donations never updated fulfilledAmount, so nothing to revert
    const wasCompleted = portalDonation.status === 'completed';
    if (
      wasCompleted &&
      portalDonation.donationRequest &&
      portalDonation.donationType === 'cash' &&
      portalDonation.amount
    ) {
      const donationRequest = await DonationRequest.findById(
        portalDonation.donationRequest
      );
      if (donationRequest) {
        donationRequest.fulfilledAmount = Math.max(
          0,
          (donationRequest.fulfilledAmount || 0) - portalDonation.amount
        );
        donationRequest.status =
          donationRequest.fulfilledAmount > 0
            ? 'partially_fulfilled'
            : 'accepted';
        await donationRequest.save();
      }
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
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const statusCounts = await PortalDonation.aggregate([
      { $match: { donor: userObjectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const counts = {
      pending_payment: 0,
      pending_delivery: 0,
      awaiting_volunteer: 0,
      pickup_scheduled: 0,
      completed: 0,
      cancelled: 0,
    };
    statusCounts.forEach((s) => {
      if (counts.hasOwnProperty(s._id)) {
        counts[s._id] = s.count;
      }
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
