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

    return res.status(201).json({
      success: true,
      message: 'User Registered Successfully',
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


