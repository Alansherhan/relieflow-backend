import mongoose from 'mongoose';

const tipItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  critical: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // e.g., "2:45"
  },
  thumbnailUrl: {
    type: String,
  },
});

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['national', 'state', 'local'],
    default: 'national',
  },
});

const disasterTipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'AlertCircle',
    },
    color: {
      type: String,
      default: 'bg-blue-500',
    },
    priority: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      default: 'medium',
    },
    region: {
      type: [String], // e.g., ['kerala', 'india', 'global']
      default: ['global'],
    },
    // Tips organized by phases
    beforeTips: [tipItemSchema],
    duringTips: [tipItemSchema],
    afterTips: [tipItemSchema],

    // Related media
    videos: [videoSchema],
    emergencyContacts: [emergencyContactSchema],

    // Additional resources
    pdfUrl: {
      type: String,
    },
    externalLinks: [
      {
        title: String,
        url: String,
      },
    ],

    // Metadata
    isActive: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
disasterTipSchema.index({ slug: 1 });
disasterTipSchema.index({ priority: 1 });
disasterTipSchema.index({ region: 1 });
disasterTipSchema.index({ isActive: 1 });

// Method to increment view count
disasterTipSchema.methods.incrementView = async function () {
  this.viewCount += 1;
  await this.save();
};

export default mongoose.model('DisasterTip', disasterTipSchema);
