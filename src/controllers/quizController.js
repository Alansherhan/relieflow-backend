import QuizQuestion from '../models/quiz.js';

// Get quiz questions by category
export const getQuizQuestions = async (req, res) => {
  try {
    const { category } = req.params;

    const questions = await QuizQuestion.find({
      category: category === 'all' ? { $exists: true } : category,
      isActive: true,
    })
      .select('-translations')
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz questions',
      error: error.message,
    });
  }
};

// Create quiz question (Admin only)
export const createQuizQuestion = async (req, res) => {
  try {
    const questionData = req.body;

    const question = await QuizQuestion.create(questionData);

    res.status(201).json({
      success: true,
      message: 'Quiz question created successfully',
      data: question,
    });
  } catch (error) {
    console.error('Error creating quiz question:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating quiz question',
      error: error.message,
    });
  }
};

// Update quiz question (Admin only)
export const updateQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const question = await QuizQuestion.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      data: question,
    });
  } catch (error) {
    console.error('Error updating quiz question:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating question',
      error: error.message,
    });
  }
};

// Delete quiz question (Admin only)
export const deleteQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await QuizQuestion.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting quiz question:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting question',
      error: error.message,
    });
  }
};
