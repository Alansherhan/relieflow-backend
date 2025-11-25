import User from '../models/userProfile.js';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken'


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

export const updateProfile=async(req,res)=>{
  try{
    const {id} = req.params;
    
    const {name,address,phoneNumber}=req.body

    if (!id) {
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }
    
    const data= await User.findById(id);
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data not available',
      });
    }

    data.name=name
    data.address=address
    data.phoneNumber=phoneNumber

    await data.save()
    console.log("Data Updated Successfully",data)
    return res.status(201).json({
      success:true,
      message:"Data Updated Successfully"
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Unable to update data"
    })
  }
}

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
        updatedAt: user.updatedAt
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