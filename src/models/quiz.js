import mongoose from 'mongoose';

const quizOptionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

const quizQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        'all',
        'floods',
        'earthquakes',
        'fires',
        'cyclones',
        'landslides',
        'medical',
        'power-outage',
        'home-safety',
      ],
    },
    type: {
      type: String,
      enum: ['multiple', 'yesno', 'scenario'],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [quizOptionSchema],
    explanation: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 10,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
  },
  { timestamps: true }
);

quizQuestionSchema.index({ category: 1, isActive: 1 });

export default mongoose.model('QuizQuestion', quizQuestionSchema);
