import User from '../models/userProfile.js';
import bcrypt from 'bcrypt';

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
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userLogin = await User.findOne({
      email: email,
    });

    if (!userLogin) {
      return res.status(404).json({
        message: 'User not found !!!',
        success: true,
      });
    }
    const isPasswordMatched = bcrypt.compare(password, userLogin.password);

    if (isPasswordMatched) {
      return res.status(201).json({
        message: userLogin,
        success: true,
      });
    }
    return res.status(401).json({
      message: "Password or Email doesnt match",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'error',
      success: false,
    });
  }
};
