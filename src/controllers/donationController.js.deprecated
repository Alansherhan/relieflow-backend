import DonationSchema from '../models/Donation.js';
import DonationRequest from '../models/DonationRequest.js';

export const addDonation = async (req, res) => {
  const {
    donatedBy,
    donationType,
    amount,
    itemDetails,
    priority,
    donationRequestId,
    proofImage,
  } = req.body;

  // Validation
  if (!donationType) {
    return res.status(400).json({
      success: false,
      message: 'donationType is required',
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
      message: 'At least one item is required for item donations',
    });
  }

  try {
    // Create the donation
    const donation = await DonationSchema.create({
      donatedBy: donatedBy || 'Anonymous',
      donationType,
      amount: donationType === 'cash' ? amount : undefined,
      itemDetails: donationType === 'item' ? itemDetails : undefined,
      priority: priority || 'medium',
      status: 'pending',
      donationRequest: donationRequestId || undefined,
      proofImage,
    });

    // If linked to a donation request, update the request
    if (donationRequestId) {
      const donationRequest = await DonationRequest.findById(donationRequestId);

      if (donationRequest) {
        // Add this donation to the request's donations array
        donationRequest.donations.push(donation._id);

        // Update fulfilled amount for cash donations
        if (donationType === 'cash' && amount) {
          donationRequest.fulfilledAmount =
            (donationRequest.fulfilledAmount || 0) + amount;

          // Check if fully fulfilled
          if (donationRequest.fulfilledAmount >= donationRequest.amount) {
            donationRequest.status = 'completed';
          } else {
            donationRequest.status = 'partially_fulfilled';
          }
        }

        await donationRequest.save();
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: donation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Donation failed',
      error: error.message,
    });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const allDonations = await DonationSchema.find()
      .populate('donationRequest')
      .lean();

    return res.status(200).json({
      success: true,
      data: allDonations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// New: Get donations for a specific request
export const getDonationsForRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const donations = await DonationSchema.find({
      donationRequest: requestId,
    }).lean();

    return res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
