import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: ['NGO', 'localAuthority'],
  },
});

// Hash password before saving
adminUserSchema.pre('save', async function (next) {
  // Only hash if password is modified or new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
adminUserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Admin', adminUserSchema);
