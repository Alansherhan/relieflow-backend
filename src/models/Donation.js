import mongoose from 'mongoose';
import { itemSchema } from './common.js';

// donation done by a single individual maybe answering to a donation request or independent
const donationSchema = new mongoose.Schema(
  {
    donatedBy: {
      type: String,
      required: false,
      default: 'Anonymous',
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
    },
    status: {
      type: String,
      required: true,
      enum: ['accepted', 'pending', 'rejected', 'completed'],
    },
    // New: Link to the donation request this fulfills
    donationRequest: {
      type: mongoose.Types.ObjectId,
      ref: 'DonationRequest',
      required: false,
    },
    // New: Proof of donation
    proofImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('DonationSchema', donationSchema);
