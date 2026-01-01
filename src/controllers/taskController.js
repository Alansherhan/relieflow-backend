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