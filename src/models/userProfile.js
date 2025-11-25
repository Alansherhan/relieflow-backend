import mongoose from 'mongoose';
import { addressSchema } from './common.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
<<<<<<< HEAD
=======
      // type: addressSchema,/
>>>>>>> 224bf43d89236b3a35a85183ca0ec6d686a2b4e0
      type: String,

      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // select: false,
      requied: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['public', 'volunteer'],
    },
    skill: {
      type: String,
      enum: [
        'police',
        'nss',
        'fire force',
        'ncc',
        'student police',
        'scout',
        'other',
      ],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Create virtual field for formatted address
userSchema.virtual('formattedAddress').get(function () {
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
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export default mongoose.model('userProfile', userSchema);
