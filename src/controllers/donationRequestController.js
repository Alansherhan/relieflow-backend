import DonationRequest from '../models/DonationRequest.js';
import Notification from '../models/Notification.js';
import { uploadFilesToCloudinary } from '../services/cloudinaryStorage.js';
// FCM is now sent automatically via Notification model post-save hook

export const addDonationRequest = async (req, res) => {
  // For multipart/form-data, req.body fields might need parsing if they are sent as JSON strings
  let {
    title,
    description,
    donationType,
    amount,
    itemDetails,
    priority,
    upiNumber,
    location,
    address,
    deadline,
  } = req.body;

  // Parse JSON strings if necessary (Flutter MultipartRequest sends complex objects as strings)
  try {
    if (typeof itemDetails === 'string') itemDetails = JSON.parse(itemDetails);
    if (typeof location === 'string') location = JSON.parse(location);
    if (typeof address === 'string') address = JSON.parse(address);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON format for itemDetails, location, or address',
    });
  }

  // Handle uploaded files
  const proofImages = req.files
    ? await uploadFilesToCloudinary(req.files, 'donation_proofs')
    : [];

  // Get userId from JWT token (set by auth middleware)
  const requestedBy = req.user?._id || req.user?.id;

  // Validation
  if (!requestedBy) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated',
    });
  }

  if (!title || !description || !donationType) {
    return res.status(400).json({
      success: false,
      message: 'title, description, and donationType are required',
    });
  }

  if (donationType === 'cash' && !upiNumber) {
    return res.status(400).json({
      success: false,
      message: 'UPI number is required for cash donation requests',
    });
  }

  if (donationType === 'cash' && (!amount || amount <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be greater than 0 for cash donations',
    });
  }

  if (donationType === 'item' && (!itemDetails || itemDetails.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'At least one item is required for item donation requests',
    });
  }

  try {
    const donationRequest = await DonationRequest.create({
      requestedBy,
      title,
      description,
      donationType,
      amount: donationType === 'cash' ? amount : undefined,
      itemDetails: donationType === 'item' ? itemDetails : undefined,
      priority: priority || 'medium',
      upiNumber: donationType === 'cash' ? upiNumber : undefined,
      location,
      address,
      deadline: deadline ? new Date(deadline) : undefined,
      proofImages: proofImages || [],
      status: 'pending',
    });

    // Notify User
    // NOTE: FCM is now sent automatically via Notification model post-save hook
    if (requestedBy) {
      try {
        await Notification.create({
          title: 'Donation Request Submitted',
          body: `Your donation request "${title}" has been received and is pending review.`,
          recipientId: requestedBy,
          type: 'donation_request_submitted',
          targetUserType: 'public',
          data: { donationRequestId: donationRequest._id.toString() },
        });
      } catch (e) {
        console.error('Failed to create user notification:', e);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Donation request created successfully',
      data: donationRequest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to create donation request',
      success: false,
      error: error.message,
    });
  }
};

export const getAllDonationRequests = async (req, res) => {
  try {
    // Get the logged-in user's ID from JWT token
    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Filter by the current user's donation requests only
    // Use lean({ virtuals: true }) to include 'name' virtual
    const allDonationRequests = await DonationRequest.find({
      requestedBy: userId,
    })
      .populate('requestedBy')
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });

    // Debug logging for consistency check
    console.log('=== getAllDonationRequests DEBUG ===');
    console.log(`User ID: ${userId}`);
    console.log(
      `Found ${allDonationRequests.length} donation requests for this user`
    );
    if (allDonationRequests.length > 0) {
      const first = allDonationRequests[0];
      console.log('First request sample:', {
        _id: first._id,
        title: first.title,
        status: first.status,
        priority: first.priority,
        donationType: first.donationType,
        name: first.name ? 'present' : 'missing',
        address: first.address ? 'present' : 'missing',
      });
    }

    return res.status(200).json({
      success: true,
      message: allDonationRequests,
    });
  } catch (error) {
    console.log('getAllDonationRequests error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
export const updateDonationRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;

    let {
      title,
      description,
      donationType,
      amount,
      itemDetails,
      priority,
      upiNumber,
      address,
      location,
      deadline,
      existingProofImages,
    } = req.body;

    // Parse JSON strings if necessary (Flutter MultipartRequest sends complex objects as strings)
    try {
      if (typeof itemDetails === 'string')
        itemDetails = JSON.parse(itemDetails);
      if (typeof location === 'string') location = JSON.parse(location);
      if (typeof address === 'string') address = JSON.parse(address);
      if (typeof existingProofImages === 'string')
        existingProofImages = JSON.parse(existingProofImages);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON format for complex fields',
      });
    }

    // Handle new uploaded files
    const newProofImages = req.files
      ? await uploadFilesToCloudinary(req.files, 'donation_proofs')
      : [];

    if (!id) {
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }

    const data = await DonationRequest.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data not available',
      });
    }

    // Check ownership
    if (data.requestedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own requests',
      });
    }

    // Check if request is still pending
    if (data.status !== 'pending') {
      return res.status(403).json({
        success: false,
        message: 'You can only edit pending requests',
      });
    }

    // Check if admin has already viewed this request
    if (data.isRead === true) {
      return res.status(403).json({
        success: false,
        message: 'This request has been viewed by admin and cannot be edited',
      });
    }

    // Update allowed fields
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (donationType !== undefined) data.donationType = donationType;
    if (amount !== undefined) data.amount = amount;
    if (itemDetails !== undefined) data.itemDetails = itemDetails;
    if (priority !== undefined) data.priority = priority;
    if (upiNumber !== undefined) data.upiNumber = upiNumber;
    if (address !== undefined) data.address = address;
    if (location !== undefined) data.location = location;
    if (deadline !== undefined) data.deadline = deadline;

    // Handle proof images - combine existing (not removed) + new
    if (existingProofImages !== undefined || newProofImages.length > 0) {
      const finalImages = [
        ...(Array.isArray(existingProofImages) ? existingProofImages : []),
        ...newProofImages,
      ];
      data.proofImages = finalImages;
    }

    await data.save();
    console.log('Data Updated Successfully', data);
    return res.status(200).json({
      success: true,
      message: 'Data Updated Successfully',
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to update data',
    });
  }
};

export const deletedDonationRequest = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id || req.user?.id;

  try {
    if (!id) {
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }
    const deletedDonationRequest = await DonationRequest.findById(id);
    if (!deletedDonationRequest) {
      return res.status(404).json({
        success: false,
        message: 'Donation request not found',
      });
    }

    // Check ownership
    if (deletedDonationRequest.requestedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own requests',
      });
    }

    // Check if request is still pending
    if (deletedDonationRequest.status !== 'pending') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete pending requests',
      });
    }

    // Check if admin has already viewed this request
    if (deletedDonationRequest.isRead === true) {
      return res.status(403).json({
        success: false,
        message: 'This request has been viewed by admin and cannot be deleted',
      });
    }

    await deletedDonationRequest.deleteOne();
    console.log(deletedDonationRequest);
    return res.status(200).json({
      success: true,
      message: 'Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete',
    });
  }
};
