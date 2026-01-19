import AdminWallet from "../models/AdminWallet.js";
import PortalDonation from "../models/PortalDonation.js";

/**
 * Get wallet info (public - for display on portal)
 */
export const getWalletInfo = async (req, res) => {
  try {
    const wallet = await AdminWallet.getMainWallet();
    
    return res.status(200).json({
      success: true,
      data: {
        name: wallet.name,
        description: wallet.description,
        balance: wallet.balance,
        totalCredits: wallet.totalCredits,
        donorCount: wallet.donorCount,
        // Don't expose full transaction history publicly
        recentDonations: wallet.transactions
          .filter(t => t.type === 'credit')
          .slice(-5)
          .map(t => ({
            amount: t.amount,
            donorName: t.donorName,
            createdAt: t.createdAt,
          })),
      },
    });
  } catch (error) {
    console.error('Error fetching wallet info:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch wallet info',
      error: error.message,
    });
  }
};

/**
 * Donate to admin wallet (authenticated)
 */
export const donateToWallet = async (req, res) => {
  try {
    const { amount, transactionRef } = req.body;
    const userId = req.user?._id || req.user?.id;
    const donorName = req.user?.name || 'Anonymous';
    const donorEmail = req.user?.email;
    const donorPhone = req.user?.phoneNumber;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0',
      });
    }
    
    // Create portal donation record
    const portalDonation = await PortalDonation.create({
      donor: userId,
      donorName,
      donorEmail,
      donorPhone,
      donationType: 'cash',
      amount,
      status: 'completed',
      isWalletDonation: true,
      transactionRef: transactionRef || `TXN_${Date.now()}`,
    });
    
    // Add to wallet
    const wallet = await AdminWallet.getMainWallet();
    await wallet.credit(
      amount,
      'Donation to relief fund',
      portalDonation._id,
      donorName
    );
    
    return res.status(201).json({
      success: true,
      message: 'Thank you for your generous donation to the relief fund!',
      data: {
        donation: portalDonation,
        walletBalance: wallet.balance,
      },
    });
  } catch (error) {
    console.error('Error donating to wallet:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process donation',
      error: error.message,
    });
  }
};

/**
 * Guest donate to wallet (no auth)
 */
export const guestDonateToWallet = async (req, res) => {
  try {
    const { amount, donorName, donorEmail, donorPhone, transactionRef } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0',
      });
    }
    
    // Create portal donation record
    const portalDonation = await PortalDonation.create({
      donor: null, // Anonymous
      donorName: donorName || 'Anonymous',
      donorEmail,
      donorPhone,
      donationType: 'cash',
      amount,
      status: 'completed',
      isWalletDonation: true,
      transactionRef: transactionRef || `TXN_${Date.now()}`,
    });
    
    // Add to wallet
    const wallet = await AdminWallet.getMainWallet();
    await wallet.credit(
      amount,
      'Guest donation to relief fund',
      portalDonation._id,
      donorName || 'Anonymous'
    );
    
    return res.status(201).json({
      success: true,
      message: 'Thank you for your generous donation to the relief fund!',
      data: {
        donation: portalDonation,
        walletBalance: wallet.balance,
      },
    });
  } catch (error) {
    console.error('Error processing guest wallet donation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process donation',
      error: error.message,
    });
  }
};

/**
 * Get full wallet details (admin only)
 */
export const getWalletDetails = async (req, res) => {
  try {
    const wallet = await AdminWallet.getMainWallet();
    
    // Populate transaction references
    await wallet.populate('transactions.portalDonation');
    await wallet.populate('transactions.donationRequest');
    
    return res.status(200).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    console.error('Error fetching wallet details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch wallet details',
      error: error.message,
    });
  }
};

/**
 * Use wallet funds for a donation request (admin only)
 */
export const useWalletFunds = async (req, res) => {
  try {
    const { amount, donationRequestId, description } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0',
      });
    }
    
    const wallet = await AdminWallet.getMainWallet();
    
    if (wallet.balance < amount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient wallet balance. Available: ₹${wallet.balance}`,
      });
    }
    
    await wallet.debit(
      amount,
      description || 'Fund utilization for relief',
      donationRequestId
    );
    
    return res.status(200).json({
      success: true,
      message: `₹${amount} deducted from wallet`,
      data: {
        newBalance: wallet.balance,
      },
    });
  } catch (error) {
    console.error('Error using wallet funds:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to use wallet funds',
      error: error.message,
    });
  }
};
