import bcrypt from 'bcrypt';
import adminUser from '../models/adminUser.js';

export const adminSignUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdAdmin = await adminUser.create({
      email: email,
      password: hashedPassword,
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
