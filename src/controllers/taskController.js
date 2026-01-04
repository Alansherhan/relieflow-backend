import TaskSchema from "../models/Task.js";

export const assignTask = async (req, res) => {
  const taskName = req.body.taskName;
  const taskType = req.body.taskType;
  const assignedTo = req.body.assignedTo;
  const donationRequest = req.body.donationRequest;

  try {
    const taskAssigned = await TaskSchema.create({
      taskName: taskName,
      taskType: taskType,
      status: "pending",
      priority: "low",
      assignedTo: assignedTo,
      donationRequest: donationRequest
    })

    return res.status(201).json({
      sucess: true,
      message: taskAssigned
    })
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "Error"
    })
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskSchema.find().populate("assignedTo").sort({ _id: -1 });
    console.log(allTasks)
    return res.status(200).json({
      success: true,
      message: allTasks
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }
    const deletedTask = await TaskSchema.findById(id);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Database is empty',
      });
    }
    await deletedTask.deleteOne();
    console.log(deletedTask);
    return res.status(201).json({
      success: true,
      message: 'Deleted Sucessfully',
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete',
    });
  }
};

// Get tasks assigned to the logged-in volunteer
export const getMyTasks = async (req, res) => {
  try {
    // JWT payload uses 'id' not '_id'
    const volunteerId = req.user.id || req.user._id;
    const { status } = req.query;

    console.log('[getMyTasks] Volunteer ID:', volunteerId);

    // Build query
    const query = { assignedTo: volunteerId };
    if (status && ['pending', 'accepted', 'completed', 'rejected'].includes(status.toLowerCase())) {
      query.status = status.toLowerCase();
    }

    const tasks = await TaskSchema.find(query)
      .populate('aidRequest')
      .populate('donationRequest')
      .sort({ _id: -1 }); // Newest first

    return res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching tasks'
    });
  }
};

// Update task status (accept, reject, complete)
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const volunteerId = req.user.id || req.user._id;

    // Validate status
    const validStatuses = ['accepted', 'rejected', 'completed'];
    if (!status || !validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: accepted, rejected, or completed'
      });
    }

    // Find task and verify it's assigned to this volunteer
    const task = await TaskSchema.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (task.assignedTo.toString() !== volunteerId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    // Update status
    task.status = status.toLowerCase();
    await task.save();

    console.log(`[updateTaskStatus] Task ${id} updated to ${status}`);

    return res.status(200).json({
      success: true,
      message: 'Task status updated',
      data: task
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error updating task status'
    });
  }
};

// Complete task with proof image upload
export const completeTaskWithProof = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteerId = req.user.id || req.user._id;

    console.log('[completeTaskWithProof] Task ID:', id);
    console.log('[completeTaskWithProof] Volunteer ID:', volunteerId);
    console.log('[completeTaskWithProof] File:', req.file);

    // Check if proof image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Proof image is required to complete the task'
      });
    }

    // Find task and verify it's assigned to this volunteer
    const task = await TaskSchema.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (task.assignedTo.toString() !== volunteerId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this task'
      });
    }

    // Check if task is in accepted state (can only complete accepted tasks)
    if (task.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'Can only complete tasks that are in accepted status'
      });
    }

    // Generate the proof image URL (relative path for serving static files)
    const proofImageUrl = `/uploads/${req.file.filename}`;

    // Update task with proof image and completion status
    task.status = 'completed';
    task.proofImageUrl = proofImageUrl;
    task.completedAt = new Date();
    await task.save();

    console.log(`[completeTaskWithProof] Task ${id} completed with proof: ${proofImageUrl}`);

    return res.status(200).json({
      success: true,
      message: 'Task completed successfully',
      data: task
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error completing task'
    });
  }
};

// Get all open tasks (marketplace)
export const getOpenTasks = async (req, res) => {
  try {
    const { skill, lng, lat } = req.query;

    let query = { status: 'open' };

    // Build aggregation pipeline for geo-sorting if coordinates provided
    let tasks;
    if (lng && lat) {
      tasks = await TaskSchema.aggregate([
        { $match: query },
        {
          $geoNear: {
            near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            distanceField: 'distance',
            spherical: true,
            maxDistance: 50000 // 50km radius
          }
        }
      ]);
    } else {
      tasks = await TaskSchema.find(query)
        .populate('aidRequest')
        .populate('donationRequest')
        .sort({ _id: -1 });
    }

    return res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('[getOpenTasks] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching open tasks'
    });
  }
};

// Volunteer claims an open task
export const claimTask = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteerId = req.user.id || req.user._id;

    console.log('[claimTask] Task ID:', id);
    console.log('[claimTask] Volunteer ID:', volunteerId);

    // Find task
    const task = await TaskSchema.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if task is still open
    if (task.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'Task is no longer available for claiming'
      });
    }

    // Check if already assigned
    if (task.assignedTo) {
      return res.status(400).json({
        success: false,
        message: 'Task has already been claimed'
      });
    }

    // Assign task to volunteer
    task.assignedTo = volunteerId;
    task.status = 'assigned'; // Move to assigned status after claim
    await task.save();

    console.log(`[claimTask] Task ${id} claimed by volunteer ${volunteerId}`);

    return res.status(200).json({
      success: true,
      message: 'Task claimed successfully',
      data: task
    });
  } catch (error) {
    console.error('[claimTask] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error claiming task'
    });
  }
};