import User from '../models/userProfile.js';
import bcrypt from 'bcryptjs';
import { getDb } from '../db/connection.js';
import jwt from 'jsonwebtoken';

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
        role: userCreated.role,
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
        role: userCreated.role,
      },
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
  const { email, password } = req.body;
  try {
    const userLogin = await User.findOne({
      email: email,
    });

    const errorResponse = {
      message: 'Unauthorized',
      success: false,
    };

    // console.log(userLogin)

    if (!userLogin) {
      return res.status(401).json(errorResponse);
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      userLogin.password
    );
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
      message: 'Login successful',
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
    const id = req.user._id || req.user.id;

    // SAFETY CHECK: Ensure req.body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'No data received. Ensure Content-Type is multipart/form-data',
      });
    }

    const { name, address, phoneNumber, email, skill } = req.body;

    if (!id) {
      return res.status(403).json({ success: false, message: 'ID required' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
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
      user.profileImage = req.file.path.replace(/\\/g, '/');
    }

    await user.save();

    console.log('Data Updated Successfully:', user);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    console.log('Update Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to update data: ' + error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete',
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    // req.user should be set by your protect middleware
    const userId = req.user._id || req.user.id;

    const user = await User.findById(userId).select('-password'); // ✅ Correct

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
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
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id || req.user._id; // from your auth middleware

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Old password and new password are required' 
      });
    }

    // Get user from database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Compare passwords correctly
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Incorrect current password' 
      });
    }

    // Assign plain password - the pre-save hook will hash it automatically
    user.password = newPassword;
    await user.save();

    res.json({ 
      success: true, 
      message: 'Password updated successfully' 
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update password' 
    });
  }
};
