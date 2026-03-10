import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String, // You defined this as a simple String
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // select: false, // Recommended to uncomment this for security
      required: true, // FIXED TYPO: was 'requied'
    },
    // --- 1. NEW FIELD FOR IMAGE UPLOAD ---
    profileImage: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      required: true,
      enum: ['public', 'volunteer'],
    },
    skill: {
      type: String,
      enum: [
        'police',
        'nss',
        'fire force',
        'ncc',
        'student police',
        'scout',
        'other',
      ],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    // FCM token for push notifications
    fcmToken: {
      type: String,
      default: null,
    },
    // Password reset OTP
    passwordResetOtp: {
      type: String,
      default: null,
    },
    passwordResetOtpExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// --- 2. ADD THIS HOOK TO ENCRYPT PASSWORDS ---
// This runs automatically before .save()
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- 3. PASSWORD MATCH METHOD ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- FIXED VIRTUAL FOR ADDRESS ---
// Since address is just a String, we don't need complex logic
userSchema.virtual('formattedAddress').get(function () {
  return this.address || '';
});

// Ensure virtuals are serialized
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export default mongoose.model('userProfile', userSchema);