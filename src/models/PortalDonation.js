import mongoose from 'mongoose';
import { itemSchema, addressSchema, locationSchema } from './common.js';

/**
 * PortalDonation - Tracks donations made through the web donation portal.
 * Supports both logged-in users and anonymous donors.
 *
 * Status Flow:
 * - pending_delivery: Item donation with self-delivery, waiting for donor to deliver
 * - awaiting_volunteer: Pickup requested, waiting for volunteer to claim
 * - pickup_scheduled: Volunteer claimed the pickup task
 * - completed: Donation verified and complete
 * - cancelled: Donor cancelled
 */
const portalDonationSchema = new mongoose.Schema(
  {
    // Donor info (optional for anonymous donations)
    donor: {
      type: mongoose.Types.ObjectId,
      ref: 'userProfile',
      required: false, // null = anonymous
    },
    donorName: {
      type: String,
      default: 'Anonymous',
    },
    donorEmail: {
      type: String,
      required: false,
    },
    donorPhone: {
      type: String,
      required: false,
    },

    // Link to the donation request being fulfilled (optional for wallet donations)
    donationRequest: {
      type: mongoose.Types.ObjectId,
      ref: 'DonationRequest',
      required: false,
    },

    // Donation details
    donationType: {
      type: String,
      enum: ['cash', 'item'],
      required: true,
    },
    amount: {
      type: Number,
      required: false, // Required for cash donations
    },
    itemDetails: [
      {
        type: itemSchema,
        required: false, // Required for item donations
      },
    ],

    // Delivery method (for item donations)
    deliveryMethod: {
      type: String,
      enum: ['self_delivery', 'pickup', 'not_applicable'],
      default: 'not_applicable',
    },

    // Pickup details (for pickup flow)
    pickupAddress: {
      type: addressSchema,
      required: false,
    },
    pickupLocation: {
      type: locationSchema,
      required: false,
    },
    pickupDate: {
      type: Date,
      required: false,
    },
    pickupNotes: {
      type: String,
      required: false,
    },

    // General notes from donor (e.g. for self-delivery)
    notes: {
      type: String,
      required: false,
    },

    // Link to auto-created pickup task
    pickupTask: {
      type: mongoose.Types.ObjectId,
      ref: 'TaskSchema',
      required: false,
    },

    // Proof of donation (for item donations)
    proofImage: {
      type: String,
      required: false,
    },

    // Status flow
    status: {
      type: String,
      enum: [
        'pending_payment', // Cash donation accepted, waiting for payment
        'pending_delivery', // Self-delivery chosen, waiting for donor to deliver
        'awaiting_volunteer', // Pickup requested, waiting for volunteer
        'pickup_scheduled', // Volunteer claimed pickup
        'completed', // Done and verified
        'cancelled', // Donor cancelled
      ],
      required: true, // Must be set explicitly based on flow
    },

    // For direct wallet donations (not linked to a specific request)
    isWalletDonation: {
      type: Boolean,
      default: false,
    },

    // Admin notes (for validation)
    adminNotes: {
      type: String,
      required: false,
    },

    // Transaction reference for mock payments
    transactionRef: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Virtual to get full donor info
portalDonationSchema.virtual('donorInfo').get(function () {
  return {
    name: this.donorName,
    email: this.donorEmail,
    phone: this.donorPhone,
    isAnonymous: !this.donor,
  };
});

// Ensure virtuals are serialized
portalDonationSchema.set('toJSON', { virtuals: true });
portalDonationSchema.set('toObject', { virtuals: true });

export default mongoose.model('PortalDonation', portalDonationSchema);
