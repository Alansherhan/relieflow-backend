import mongoose from "mongoose";

/**
 * AdminWallet - Central fund for relief operations.
 * Donors can contribute directly to this wallet.
 * Admin can use wallet funds to fulfill donation requests.
 */

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  // Link to the portal donation (for credits)
  portalDonation: {
    type: mongoose.Types.ObjectId,
    ref: 'PortalDonation',
    required: false,
  },
  // Link to donation request (for debits when admin uses funds)
  donationRequest: {
    type: mongoose.Types.ObjectId,
    ref: 'DonationRequest',
    required: false,
  },
  // Donor info for display
  donorName: {
    type: String,
    default: 'Anonymous',
  },
}, { timestamps: true });

const adminWalletSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Main Relief Fund',
  },
  description: {
    type: String,
    default: 'Central fund for disaster relief operations',
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
  transactions: [transactionSchema],
  
  // Statistics
  totalCredits: {
    type: Number,
    default: 0,
  },
  totalDebits: {
    type: Number,
    default: 0,
  },
  donorCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Method to add funds (credit)
adminWalletSchema.methods.credit = async function(amount, description, portalDonationId, donorName) {
  this.transactions.push({
    amount,
    type: 'credit',
    description,
    portalDonation: portalDonationId,
    donorName: donorName || 'Anonymous',
  });
  this.balance += amount;
  this.totalCredits += amount;
  this.donorCount += 1;
  return this.save();
};

// Method to use funds (debit)
adminWalletSchema.methods.debit = async function(amount, description, donationRequestId) {
  if (this.balance < amount) {
    throw new Error('Insufficient wallet balance');
  }
  this.transactions.push({
    amount,
    type: 'debit',
    description,
    donationRequest: donationRequestId,
  });
  this.balance -= amount;
  this.totalDebits += amount;
  return this.save();
};

// Static method to get or create the main wallet
adminWalletSchema.statics.getMainWallet = async function() {
  let wallet = await this.findOne({ name: 'Main Relief Fund' });
  if (!wallet) {
    wallet = await this.create({
      name: 'Main Relief Fund',
      description: 'Central fund for disaster relief operations',
    });
  }
  return wallet;
};

export default mongoose.model("AdminWallet", adminWalletSchema);
