import User from '../models/userProfile.js';
import bcrypt from 'bcryptjs';
import { getDb } from '../db/connection.js';
import jwt from 'jsonwebtoken'

import { MongoClient } from 'mongodb';

// Create a single connection
let dbInstance = null;

const getDatabase = async () => {
  if (dbInstance) return dbInstance;
  
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  dbInstance = client.db('volunteer_app'); // Replace with your DB name
  return dbInstance;
};


export const signUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const role = req.body.role;
  
  try {
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      name: name,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      role: role,
      skill: 'other',
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: userCreated._id, 
        email: userCreated.email,
        role: userCreated.role 
      },
      process.env.JWT_SECRET, // Make sure you have this in your .env file
      { expiresIn: '7d' } // Token expires in 7 days
    );

    return res.status(201).json({
      success: true,
      message: 'User Registered Successfully',
      token: token, // Add token to response
      user: {
        id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        role: userCreated.role
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.code === 11000 ? 'duplicate email' : error,
    });
  }
};

export const login = async (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;
  const {email, password} = req.body
  try {
    const userLogin = await User.findOne({
      email: email,
    });

    const errorResponse = {
        message: "Unauthorized",
        success: false,
    }

    // console.log(userLogin)

    if (!userLogin) {
      return res.status(401).json(errorResponse);
    }
    const isPasswordMatched = await bcrypt.compare(password, userLogin.password);
    // console.log(isPasswordMatched)
    // console.log(password)
    // console.log(userLogin.password)

    if (!isPasswordMatched) {
      return res.status(401).json(errorResponse);
    }
//Key generation for authentication checking that takes place in middleware
    const payload = {
      id: userLogin._id,
      email: userLogin.email,
      role: userLogin.role,
    };

    //creating token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token: token,
      user: userLogin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    // SAFETY CHECK: Ensure req.body exists
    if (!req.body) {
      return res.status(400).json({ 
        success: false, 
        message: "No data received. Ensure Content-Type is multipart/form-data" 
      });
    }

    const { name, address, phoneNumber, email, skill } = req.body;

    if (!id) {
      return res.status(403).json({ success: false, message: 'ID required' });
    }
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update fields if they exist in the request
    if (name) user.name = name;
    if (address) user.address = address;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (email) user.email = email;
    if (skill) user.skill = skill;

    // HANDLE IMAGE UPLOAD
    if (req.file) {
      // req.file.path contains the location (e.g., "uploads/image.jpg")
      // Normalize path for different OS (Windows uses backslashes)
      user.profileImage = req.file.path.replace(/\\/g, "/");
    }

    await user.save();
    
    console.log("Data Updated Successfully:", user);
    
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user
    });

  } catch (error) {
    console.log("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update data: " + error.message
    });
  }
};

export const deleteUser=async(req,res)=>{
  const { id } = req.params;
  
    try {
      if (!id) {
        return res.status(403).json({
          success: false,
          message: 'id required',
        });
      }
      const deletedUser = await User.findById(id);
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'Database is empty',
        });
      }
      await deletedUser.deleteOne();
      console.log(deletedUser);
      return res.status(201).json({
        success: true,
        message: 'Deleted Sucessfully',
      });
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Unable to delete',
      });
    }
}

export const getUserProfile = async (req, res) => {
  try {
    // req.user should be set by your protect middleware
    const userId = req.user._id || req.user.id;
    
    const user = await User.findById(userId).select('-password'); // ✅ Correct
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        role: user.role,
        skill: user.skill,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user profile',
      error: error.message 
    });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // from your auth middleware
  
  // Get user from database
  const user = await User.findById(userId);
  
  // IMPORTANT: Compare passwords correctly
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect current password" });
  }
  
  // Hash new password before saving
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  
  res.json({ message: "Password updated successfully" });
};

// ============================================================================
// FORGOT PASSWORD FUNCTIONS - ES Module Version for MongoDB
// Add these to your existing userProfileController.js
// ============================================================================

import crypto from 'crypto';
// import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

// ============================================================================
// EMAIL CONFIGURATION
// ============================================================================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ============================================================================
// STEP 1: FORGOT PASSWORD - Request reset link
// ============================================================================
export const forgotPassword = async (req, res) => {
  const startTime = Date.now();

  try {
    const { email } = req.body;

    // Validate email format
    if (!email || !isValidEmail(email)) {
      await simulateDelay(startTime);
      return res.status(200).json({
        message: 'If an account exists with this email, a password reset link has been sent.',
      });
    }

    // Find user by email
    const db = await getDatabase();
const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ 
      email: email.toLowerCase() 
    });

    if (!user) {
      await simulateDelay(startTime);
      return res.status(200).json({
        message: 'If an account exists with this email, a password reset link has been sent.',
      });
    }

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash the token before storing
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expiration (30 minutes)
    const expiresAt = Date.now() + 30 * 60 * 1000;

    // Store hashed token in database
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          resetToken: hashedToken,
          resetTokenExpires: expiresAt,
          resetTokenUsed: false,
        }
      }
    );

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send email
    await sendPasswordResetEmail(
      user.email, 
      user.firstName || user.first_name || user.name, 
      resetUrl
    );

    console.log(`Password reset requested for: ${email}`);

    await simulateDelay(startTime);

    res.status(200).json({
      message: 'If an account exists with this email, a password reset link has been sent.',
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    await simulateDelay(startTime);
    
    res.status(200).json({
      message: 'If an account exists with this email, a password reset link has been sent.',
    });
  }
};

// ============================================================================
// STEP 2: VERIFY TOKEN - Check if token is valid
// ============================================================================
export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Token is required' 
      });
    }

   const db = await getDatabase();
const usersCollection = db.collection('users');

    // Hash the provided token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token
    const user = await usersCollection.findOne({ 
      resetToken: hashedToken 
    });

    if (!user) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Invalid token' 
      });
    }

    // Check if token has expired
    if (Date.now() > user.resetTokenExpires) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Token has expired' 
      });
    }

    // Check if token was already used
    if (user.resetTokenUsed) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Token has already been used' 
      });
    }

    res.status(200).json({ 
      valid: true, 
      message: 'Token is valid' 
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ 
      valid: false, 
      message: 'Server error' 
    });
  }
};

// ============================================================================
// STEP 3: RESET PASSWORD - Actually change the password
// ============================================================================
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    // Validate inputs
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters long' 
      });
    }

   const db = await getDatabase();
const usersCollection = db.collection('users');

    // Hash the provided token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token
    const user = await usersCollection.findOne({ 
      resetToken: hashedToken 
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired reset token' 
      });
    }

    // Check if token has expired
    if (Date.now() > user.resetTokenExpires) {
      return res.status(400).json({ 
        success: false, 
        message: 'Reset token has expired. Please request a new one.' 
      });
    }

    // Check if token was already used
    if (user.resetTokenUsed) {
      return res.status(400).json({ 
        success: false, 
        message: 'This reset link has already been used' 
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and mark token as used
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          resetTokenUsed: true,
        },
        $unset: {
          resetToken: "",
          resetTokenExpires: "",
        }
      }
    );

    // Send confirmation email
    await sendPasswordChangedEmail(user.email);

    console.log(`Password reset completed for user: ${user.email}`);

    res.status(200).json({ 
      success: true, 
      message: 'Password has been successfully reset. You can now log in with your new password.' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while resetting your password' 
    });
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function simulateDelay(startTime, targetDelay = 250) {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, targetDelay - elapsed);
  if (remaining > 0) {
    await new Promise(resolve => setTimeout(resolve, remaining));
  }
}

async function sendPasswordResetEmail(email, userName, resetUrl) {
  const mailOptions = {
    from: `"Volunteer App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #74bcf7; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .warning { 
              background-color: #fff3cd; 
              border: 1px solid #ffc107; 
              padding: 10px; 
              border-radius: 5px; 
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Password Reset Request</h2>
            <p>Hi ${userName || 'there'},</p>
            <p>We received a request to reset your password for your Volunteer App account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul>
                <li>This link will expire in 30 minutes</li>
                <li>If you didn't request this, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>Volunteer App Team</p>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendPasswordChangedEmail(email) {
  const mailOptions = {
    from: `"Volunteer App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your Password Has Been Changed',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .alert { 
              background-color: #d4edda; 
              border: 1px solid #c3e6cb; 
              padding: 15px; 
              border-radius: 5px; 
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Password Changed Successfully</h2>
            <div class="alert">
              ✅ Your password has been successfully changed.
            </div>
            <p>If you did not make this change, please contact our support team immediately.</p>
            <p>For your security, all active sessions have been logged out.</p>
            <p>Best regards,<br>Volunteer App Team</p>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================
/*
1. Add these functions to your userProfileController.js (or create a new passwordController.js)

2. In your routes file (e.g., routes/auth.js), add:
   import { forgotPassword, verifyResetToken, resetPassword } from '../controllers/userProfileController.js';
   
   router.post('/forgot-password', forgotPassword);
   router.get('/verify-reset-token/:token', verifyResetToken);
   router.post('/reset-password', resetPassword);

3. Make sure your server.js has the database connection set up:
   app.locals.db = db;

4. Add these environment variables to your .env:
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   FRONTEND_URL=http://localhost:3000

5. For Gmail, you need to create an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Generate a new app password
   - Use that password in SMTP_PASSWORD (not your regular Gmail password)

6. Optional: Add rate limiting middleware to your routes:
   import rateLimit from 'express-rate-limit';
   
   const forgotPasswordLimiter = rateLimit({
     windowMs: 60 * 60 * 1000,
     max: 3,
     message: 'Too many requests, please try again later.'
   });
   
   router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
*/