import AidRequest from '../models/AidRequest.js';
import Notification from '../models/Notification.js';
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
  const address = req.body.address;
  // Get imageUrl from uploaded file or from body
  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.imageUrl;
  const description = req.body.description;
  const location = req.body.location;
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

// export const update
