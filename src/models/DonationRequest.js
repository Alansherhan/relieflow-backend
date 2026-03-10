import mongoose from 'mongoose';
import { itemSchema, locationSchema, addressSchema } from './common.js';

const donationRequestSchema = new mongoose.Schema(
  {
    // New: Title for the donation request
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    // New: Description explaining why help is needed
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    requestedBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'userProfile',
    },
    donationType: {
      type: String,
      required: true,
      enum: ['cash', 'item'],
    },
    amount: {
      type: Number,
      required: false,
    },
    itemDetails: [
      {
        type: itemSchema,
        required: false,
      },
    ],
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      required: true,
      enum: [
        'accepted',
        'pending',
        'rejected',
        'completed',
        'partially_fulfilled',
        'in_progress',
      ],
      default: 'pending',
    },
    // Fixed: Changed from undefined imageUrl to String array
    proofImages: [
      {
        type: String,
      },
    ],
    // Fixed: Made optional (only required for cash donations)
    upiNumber: {
      type: String,
      required: false,
    },
    // New: Location for delivery/pickup
    location: {
      type: locationSchema,
      required: false,
    },
    // New: Address details
    address: {
      type: addressSchema,
      required: false,
    },
    // New: Deadline for when help is needed
    deadline: {
      type: Date,
      required: false,
    },
    // New: Track partial fulfillment for cash donations
    fulfilledAmount: {
      type: Number,
      default: 0,
    },
    // New: Link donations that fulfill this request
    donations: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'PortalDonation',
      },
    ],
    // Track if admin has viewed this request
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

donationRequestSchema.virtual('requestedUser', {
  ref: 'userProfile',
  localField: 'requestedBy',
  foreignField: '_id',
  justOne: true,
});

function autopopulate(next) {
  this.populate('requestedUser');
  next();
}

donationRequestSchema.pre('find', autopopulate);
donationRequestSchema.pre('findOne', autopopulate);

donationRequestSchema.virtual('name').get(function () {
  const { donationType, requestedUser } = this;
  const userName = requestedUser?.name || 'Anonymous';

  if (donationType === 'cash') {
    const { amount } = this;
    return `₹${amount} - ${userName}`;
  }
  return `Items - ${userName}`;
});

// Create virtual field for formatted address
donationRequestSchema.virtual('formattedAddress').get(function () {
  const { address } = this;
  if (!address) return '';

  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.addressLine3,
  ].filter((line) => line && line.trim() !== '');

  const pin = address.pinCode ? `– ${address.pinCode}` : '';

  return parts.join(', ') + ' ' + pin;
});

// Ensure virtuals are serialized
donationRequestSchema.set('toJSON', { virtuals: true });
donationRequestSchema.set('toObject', { virtuals: true });

export default mongoose.model('DonationRequest', donationRequestSchema);
