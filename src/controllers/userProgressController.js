import UserProgress from '../models/userProgress.js';

// Get user's progress
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    let progress = await UserProgress.findOne({ userId }).populate(
      'bookmarkedTips',
      'title slug description icon color'
    );

    // Create progress record if doesn't exist
    if (!progress) {
      progress = await UserProgress.create({ userId });
    }

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message,
    });
  }
};

// Toggle bookmark
export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { tipId } = req.body;

    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      progress = await UserProgress.create({ userId });
    }

    const bookmarkIndex = progress.bookmarkedTips.indexOf(tipId);

    if (bookmarkIndex > -1) {
      // Remove bookmark
      progress.bookmarkedTips.splice(bookmarkIndex, 1);
    } else {
      // Add bookmark
      progress.bookmarkedTips.push(tipId);
    }

    progress.lastActive = Date.now();
    await progress.save();

    res.status(200).json({
      success: true,
      message: bookmarkIndex > -1 ? 'Bookmark removed' : 'Bookmark added',
      data: progress,
    });
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating bookmark',
      error: error.message,
    });
  }
};

// Mark checklist item as complete
export const toggleChecklistItem = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { tipId, phase, itemText } = req.body;

    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      progress = await UserProgress.create({ userId });
    }

    // Check if item already completed
    const existingIndex = progress.completedItems.findIndex(
      (item) =>
        item.tipId.toString() === tipId &&
        item.phase === phase &&
        item.itemText === itemText
    );

    if (existingIndex > -1) {
      // Remove from completed
      progress.completedItems.splice(existingIndex, 1);
    } else {
      // Add to completed
      progress.completedItems.push({
        tipId,
        phase,
        itemText,
        completedAt: Date.now(),
      });
    }

    progress.lastActive = Date.now();
    await progress.save();

    res.status(200).json({
      success: true,
      message: existingIndex > -1 ? 'Item unchecked' : 'Item checked',
      data: progress,
    });
  } catch (error) {
    console.error('Error toggling checklist item:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating checklist',
      error: error.message,
    });
  }
};

// Save quiz result
export const saveQuizResult = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { category, score, totalQuestions, percentage } = req.body;

    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      progress = await UserProgress.create({ userId });
    }

    // Add quiz result
    progress.quizResults.push({
      category,
      score,
      totalQuestions,
      percentage,
      completedAt: Date.now(),
    });

    // Update overall preparedness score (average of all quiz percentages)
    const totalPercentage = progress.quizResults.reduce(
      (sum, result) => sum + result.percentage,
      0
    );
    progress.preparednessScore = Math.round(
      totalPercentage / progress.quizResults.length
    );

    progress.lastActive = Date.now();
    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Quiz result saved',
      data: progress,
    });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving quiz result',
      error: error.message,
    });
  }
};

// Get user's bookmarked tips
export const getBookmarkedTips = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const progress = await UserProgress.findOne({ userId }).populate(
      'bookmarkedTips'
    );

    if (!progress) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: progress.bookmarkedTips,
    });
  } catch (error) {
    console.error('Error fetching bookmarked tips:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookmarks',
      error: error.message,
    });
  }
};

// Get user's completed checklist items for a specific tip
export const getCompletedItems = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { tipId } = req.params;

    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const completedItems = progress.completedItems.filter(
      (item) => item.tipId.toString() === tipId
    );

    res.status(200).json({
      success: true,
      data: completedItems,
    });
  } catch (error) {
    console.error('Error fetching completed items:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching completed items',
      error: error.message,
    });
  }
};
