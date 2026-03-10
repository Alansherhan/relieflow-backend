import DisasterTip from '../models/disasterTip.js';
import UserProgress from '../models/userProgress.js';

// Get all disaster tips
export const getAllTips = async (req, res) => {
  try {
    const { region, priority, search } = req.query;

    let query = { isActive: true };

    // Filter by region (e.g., kerala)
    if (region) {
      query.region = region;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const tips = await DisasterTip.find(query)
      .select('-translations') // Exclude translations from list view
      .sort({ priority: -1, title: 1 });

    res.status(200).json({
      success: true,
      count: tips.length,
      data: tips,
    });
  } catch (error) {
    console.error('Error fetching tips:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching disaster tips',
      error: error.message,
    });
  }
};

// Get single tip by slug
export const getTipBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const tip = await DisasterTip.findOne({ slug, isActive: true });

    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found',
      });
    }

    // Increment view count
    await tip.incrementView();

    res.status(200).json({
      success: true,
      data: tip,
    });
  } catch (error) {
    console.error('Error fetching tip:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tip',
      error: error.message,
    });
  }
};

// Create new tip (Admin only)
export const createTip = async (req, res) => {
  try {
    const tipData = req.body;

    // Generate slug from title
    if (!tipData.slug) {
      tipData.slug = tipData.title.toLowerCase().replace(/\s+/g, '-');
    }

    const tip = await DisasterTip.create(tipData);

    res.status(201).json({
      success: true,
      message: 'Tip created successfully',
      data: tip,
    });
  } catch (error) {
    console.error('Error creating tip:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating tip',
      error: error.message,
    });
  }
};

// Update tip (Admin only)
export const updateTip = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    updateData.lastUpdated = Date.now();

    const tip = await DisasterTip.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tip updated successfully',
      data: tip,
    });
  } catch (error) {
    console.error('Error updating tip:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating tip',
      error: error.message,
    });
  }
};

// Delete tip (Admin only)
export const deleteTip = async (req, res) => {
  try {
    const { id } = req.params;

    const tip = await DisasterTip.findByIdAndDelete(id);

    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tip deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting tip:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting tip',
      error: error.message,
    });
  }
};

// Get tips by category/disaster type
export const getTipsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const tips = await DisasterTip.find({
      slug: { $regex: category, $options: 'i' },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: tips.length,
      data: tips,
    });
  } catch (error) {
    console.error('Error fetching tips by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tips',
      error: error.message,
    });
  }
};
