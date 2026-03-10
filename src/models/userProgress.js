import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userProfile',
      required: true,
    },
    // Bookmarked tips
    bookmarkedTips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DisasterTip',
      },
    ],
    // Completed checklist items
    completedItems: [
      {
        tipId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'DisasterTip',
        },
        phase: {
          type: String,
          enum: ['before', 'during', 'after'],
        },
        itemText: String,
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Quiz results
    quizResults: [
      {
        category: String,
        score: Number,
        totalQuestions: Number,
        percentage: Number,
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Overall preparedness score
    preparednessScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index for efficient querying
userProgressSchema.index({ userId: 1, 'completedItems.tipId': 1 });

export default mongoose.model('UserProgress', userProgressSchema);
