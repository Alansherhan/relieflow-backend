import mongoose from 'mongoose';
import { addressSchema, locationSchema } from './common.js';

const aidRequestSchema = new mongoose.Schema(
  {
    calamityType: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'CalamityType',
    },
    address: {
      type: addressSchema,
      required: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['accepted', 'pending', 'rejected', 'completed', 'in_progress'],
    },
    priority: {
      type: String,
      required: true,
      enum: ['high', 'medium', 'low'],
    },
    aidRequestedBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'userProfile',
    },
    // Track if admin has viewed this request
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

aidRequestSchema.virtual('calamity', {
  ref: 'CalamityType',
  localField: 'calamityType',
  foreignField: '_id',
  justOne: true,
});

function autopopulate(next) {
  this.populate('calamity');
  next();
}

aidRequestSchema.pre('find', autopopulate);
aidRequestSchema.pre('findOne', autopopulate);

// Create virtual field for formatted address
aidRequestSchema.virtual('formattedAddress').get(function () {
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

aidRequestSchema.virtual('name').get(function () {
  const { address, calamity } = this;
  if (!address) return '';

  const location = address.addressLine1 || 'Unknown Location';
  const calamityName = calamity?.calamityName || 'Unknown';

  return `${calamityName} - ${location}`;
});

// Ensure virtuals are serialized
aidRequestSchema.set('toJSON', { virtuals: true });
aidRequestSchema.set('toObject', { virtuals: true });

export default mongoose.model('AidRequest', aidRequestSchema);
