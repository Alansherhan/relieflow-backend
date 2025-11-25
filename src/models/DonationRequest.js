import mongoose from 'mongoose';
import { itemSchema } from './common.js';

const donationRequestSchema = new mongoose.Schema({
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
  },
  status: {
    type: String,
    required: true,
    enum: ['accepted', 'pending', 'rejected',"completed"],
  },
});


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
  const userName = requestedUser.name || 'Anonymous';

  if(donationType === 'cash'){
    const {amount} = this;
    return `₹${amount} - ${userName}`
  }
  return `Items - ${userName}`;
});

// Ensure virtuals are serialized
donationRequestSchema.set('toJSON', { virtuals: true });
donationRequestSchema.set('toObject', { virtuals: true });

export default mongoose.model('DonationRequest', donationRequestSchema);
