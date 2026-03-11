import AidRequest from '../models/AidRequest.js';
import Notification from '../models/Notification.js';
import { uploadFileToCloudinary } from '../services/cloudinaryStorage.js';
// FCM is now sent automatically via Notification model post-save hook

export const getAidRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const aid = await AidRequest.findById(id);

    return res.status(201).json({
      success: true,
      message: 'Aid request retrieved',
      data: aid,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const addAidRequest = async (req, res) => {
  // const {calamityType , location , imageUrl ,aidRequestedBy} = req.body
  const calamityType = req.body.calamityType;

  // Parse address if it's a JSON string (from some clients), otherwise use as-is
  const address =
    typeof req.body.address === 'string'
      ? JSON.parse(req.body.address)
      : req.body.address;

  // Get imageUrl from uploaded file or from body
  const imageUrl = req.file
    ? await uploadFileToCloudinary(req.file, 'aid_requests')
    : req.body.imageUrl;
  const description = req.body.description;

  // Parse location if it's a JSON string
  const location =
    typeof req.body.location === 'string'
      ? JSON.parse(req.body.location)
      : req.body.location;

  // Get user ID from authenticated user (set by protect middleware)
  const aidRequestedBy = req.user?._id || req.user?.id;

  console.log('Request body:', req.body);
  console.log('Location received:', location);
  console.log('Uploaded file:', req.file);

  if (!calamityType || !address) {
    return res.status(422).json({
      success: false,
      message: 'Validation Failed',
    });
  }

  if (!imageUrl) {
    return res.status(400).json({
      success: false,
      errors: [{ field: 'imageUrl', message: 'Please insert an image' }],
    });
  }

  try {
    const aidCreated = await AidRequest.create({
      calamityType: calamityType,
      address: address,
      location: location,
      imageUrl: imageUrl,
      description: description,
      status: 'pending',
      priority: 'low',
      aidRequestedBy: aidRequestedBy,
    });

    const populatedAidData = await aidCreated.populate([
      'calamityType',
      'aidRequestedBy',
    ]);

    // Get user-friendly name for notification
    const calamityName = populatedAidData.calamityType?.calamityName || 'Aid';
    const locationName = address?.addressLine1 || 'your location';

    // Notify User
    // NOTE: FCM is now sent automatically via Notification model post-save hook
    if (aidRequestedBy) {
      try {
        await Notification.create({
          title: 'Aid Request Submitted',
          body: `Your ${calamityName} aid request for ${locationName} has been received.`,
          recipientId: aidRequestedBy,
          type: 'aid_request_submitted',
          data: { aidRequestId: aidCreated._id.toString() },
        });
      } catch (e) {
        console.error('Failed to create user notification:', e);
      }
    }

    // NOTE: Volunteer notifications are sent when admin ACCEPTS the request
    // (via AdminJS accept action), not on creation

    return res.status(201).json({
      success: true,
      message: 'Your aid request have been submitted',
      data: populatedAidData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getAllAidRequests = async (req, res) => {
  try {
    // Use lean({ virtuals: true }) to include formattedAddress and name virtuals
    const aidRequest = await AidRequest.find()
      .populate('calamityType')
      .sort({ _id: -1 })
      .lean({ virtuals: true });

    console.log('=== getAllAidRequests DEBUG ===');
    console.log(`Found ${aidRequest.length} aid requests`);

    return res.status(200).json({
      success: true,
      message: aidRequest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const deleteAidRequest = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }
    const deletedAid = await AidRequest.findById(id);
    if (!deletedAid) {
      return res.status(404).json({
        success: false,
        message: 'Data not found',
      });
    }
    await deletedAid.deleteOne();
    console.log(deletedAid);
    return res.status(201).json({
      message: 'Deleted Successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete',
    });
  }
};

// Get aid requests for the logged-in public user
export const getMyAidRequests = async (req, res) => {
  try {
    // Note: JWT payload has 'id' not '_id'
    const userId = req.user._id || req.user.id;

    // IMPORTANT: Using lean({ virtuals: true }) to include virtuals like
    // 'formattedAddress' and 'name' which are defined in the schema
    const aidRequests = await AidRequest.find({ aidRequestedBy: userId })
      .populate('calamityType')
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });

    // Debug logging to verify data consistency
    console.log('=== getMyAidRequests DEBUG ===');
    console.log(`User ID: ${userId}`);
    console.log(`Found ${aidRequests.length} aid requests`);
    if (aidRequests.length > 0) {
      const first = aidRequests[0];
      console.log('First request sample:', {
        _id: first._id,
        status: first.status,
        priority: first.priority,
        description: first.description ? 'present' : 'missing',
        imageUrl: first.imageUrl ? 'present' : 'missing',
        address: first.address ? 'present' : 'missing',
        formattedAddress: first.formattedAddress ? 'present' : 'missing',
        name: first.name ? 'present' : 'missing',
        calamityType: first.calamityType
          ? {
              _id: first.calamityType._id,
              calamityName: first.calamityType.calamityName,
            }
          : 'missing',
      });
    }

    return res.status(200).json({
      success: true,
      message: aidRequests,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// Update aid request by the logged-in public user
export const updateAidRequestByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || req.user?.id;

    const { calamityType, description, priority } = req.body;

    // Parse JSON strings from multipart/form-data
    const address = req.body.address
      ? typeof req.body.address === 'string'
        ? JSON.parse(req.body.address)
        : req.body.address
      : undefined;
    const location = req.body.location
      ? typeof req.body.location === 'string'
        ? JSON.parse(req.body.location)
        : req.body.location
      : undefined;

    // Handle image from file upload or body
    const imageUrl = req.file
      ? await uploadFileToCloudinary(req.file, 'aid_requests')
      : req.body.imageUrl;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Request ID is required',
      });
    }

    const aidRequest = await AidRequest.findById(id);

    if (!aidRequest) {
      return res.status(404).json({
        success: false,
        message: 'Aid request not found',
      });
    }

    // Check ownership
    if (aidRequest.aidRequestedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own requests',
      });
    }

    // Check if request is still pending
    if (aidRequest.status !== 'pending') {
      return res.status(403).json({
        success: false,
        message: 'You can only edit pending requests',
      });
    }

    // Check if admin has already viewed this request
    if (aidRequest.isRead === true) {
      return res.status(403).json({
        success: false,
        message: 'This request has been viewed by admin and cannot be edited',
      });
    }

    // Update allowed fields
    if (calamityType !== undefined) aidRequest.calamityType = calamityType;
    if (address !== undefined) aidRequest.address = address;
    if (location !== undefined) aidRequest.location = location;
    if (description !== undefined) aidRequest.description = description;
    if (imageUrl !== undefined) aidRequest.imageUrl = imageUrl;
    if (priority !== undefined) aidRequest.priority = priority;

    await aidRequest.save();

    const populatedAidData = await aidRequest.populate([
      'calamityType',
      'aidRequestedBy',
    ]);

    console.log('Aid Request Updated Successfully', populatedAidData);
    return res.status(200).json({
      success: true,
      message: 'Aid request updated successfully',
      data: populatedAidData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to update aid request',
    });
  }
};

// Delete aid request by the logged-in public user
export const deleteAidRequestByUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id || req.user?.id;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Request ID is required',
      });
    }

    const aidRequest = await AidRequest.findById(id);

    if (!aidRequest) {
      return res.status(404).json({
        success: false,
        message: 'Aid request not found',
      });
    }

    // Check ownership
    if (aidRequest.aidRequestedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own requests',
      });
    }

    // Check if request is still pending
    if (aidRequest.status !== 'pending') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete pending requests',
      });
    }

    // Check if admin has already viewed this request
    if (aidRequest.isRead === true) {
      return res.status(403).json({
        success: false,
        message: 'This request has been viewed by admin and cannot be deleted',
      });
    }

    await aidRequest.deleteOne();
    console.log('Aid Request Deleted:', aidRequest._id);
    return res.status(200).json({
      success: true,
      message: 'Aid request deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete aid request',
    });
  }
};

// export const update
