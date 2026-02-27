import Admin from '../models/adminUser.js';
import bcrypt from 'bcrypt';

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const adminSignUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Password will be hashed by the model's pre-save hook
    const createdAdmin = await Admin.create({
      email: email,
      password: password, // Plain password - model pre-save hook will hash it
      position: 'NGO',
    });

    return res.status(201).json({
      success: true,
      message: createdAdmin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.code === 11000 ? 'duplicate email' : error,
    });
  }
};

export const adminForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    console.log(`[ADMIN FORGOT PASSWORD] Request received for email: ${email}`);

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    // For security, always return success even if admin doesn't exist
    if (!admin) {
      console.log(`[ADMIN FORGOT PASSWORD] No admin found with email: ${email}`);
      return res.status(200).json({
        success: true,
        message: 'If the email exists, an OTP has been sent.',
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Set OTP expiry to 10 minutes from now
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP to admin document
    admin.passwordResetOtp = otp;
    admin.passwordResetOtpExpires = otpExpiry;
    await admin.save({ validateBeforeSave: false });

    // Log OTP to console (for development/testing)
    console.log('='.repeat(50));
    console.log('[ADMIN FORGOT PASSWORD] OTP Generated');
    console.log(`Email: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log(`Expires at: ${otpExpiry.toLocaleString()}`);
    console.log('='.repeat(50));

    return res.status(200).json({
      success: true,
      message: 'If the email exists, an OTP has been sent.',
    });
  } catch (error) {
    console.error('Admin forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process forgot password request',
    });
  }
};

export const adminResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
      passwordResetOtp: otp,
      passwordResetOtpExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    // Update password (pre-save hook will hash it)
    admin.password = newPassword;

    // Clear OTP fields
    admin.passwordResetOtp = null;
    admin.passwordResetOtpExpires = null;

    await admin.save();

    console.log(`[ADMIN RESET PASSWORD] Password reset successful for: ${email}`);

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Admin reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reset password',
    });
  }
};
