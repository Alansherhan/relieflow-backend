import Admin from '../models/adminUser.js';

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
