import TaskSchema from "../models/Task.js";
import AidRequest from "../models/AidRequest.js";
import Notification from "../models/Notification.js";
// FCM is now sent automatically via Notification model post-save hook

export const assignTask = async (req, res) => {
  const taskName = req.body.taskName;
  const taskType = req.body.taskType;
  const assignedVolunteers = req.body.assignedVolunteers || [];
  const donationRequest = req.body.donationRequest;
  const volunteersNeeded = req.body.volunteersNeeded || 1;

  try {
    const taskAssigned = await TaskSchema.create({
      taskName: taskName,
      taskType: taskType,
      status: assignedVolunteers.length > 0 ? "assigned" : "open",
      priority: "low",
      volunteersNeeded: volunteersNeeded,
      assignedVolunteers: assignedVolunteers,
      donationRequest: donationRequest
    });

    return res.status(201).json({
      success: true,
      message: taskAssigned
    });
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error"
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskSchema.find()
      .populate("assignedVolunteers")
      .sort({ _id: -1 });
    console.log(allTasks);
    return res.status(200).json({
      success: true,
      message: allTasks
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
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

    // Build query - check if volunteer is in assignedVolunteers array
    const query = { assignedVolunteers: volunteerId };
    if (status && ['assigned', 'accepted', 'completed', 'rejected'].includes(status.toLowerCase())) {
      query.status = status.toLowerCase();
    }

    const tasks = await TaskSchema.find(query)
      .populate('aidRequest')
      .populate('donationRequest')
      .populate('assignedVolunteers')
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

    // Find task and verify this volunteer is assigned
    const task = await TaskSchema.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if volunteer is in assignedVolunteers array
    const isAssigned = task.assignedVolunteers.some(v => v.toString() === volunteerId.toString());
    if (!isAssigned) {
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

    // Find task and verify this volunteer is assigned
    const task = await TaskSchema.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if volunteer is in assignedVolunteers array
    const isAssigned = task.assignedVolunteers.some(v => v.toString() === volunteerId.toString());
    if (!isAssigned) {
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

// Get all open tasks with available slots (marketplace)
export const getOpenTasks = async (req, res) => {
  try {
    const { skill, lng, lat } = req.query;
    const volunteerId = req.user?.id || req.user?._id;

    // Find tasks that are open AND have available slots
    // Use aggregation to filter by volunteer count < volunteersNeeded
    let tasks;
    
    if (lng && lat) {
      tasks = await TaskSchema.aggregate([
        {
          $match: {
            status: 'open'
          }
        },
        {
          $addFields: {
            currentVolunteerCount: { $size: '$assignedVolunteers' },
            hasOpenSlots: {
              $lt: [{ $size: '$assignedVolunteers' }, '$volunteersNeeded']
            }
          }
        },
        {
          $match: {
            hasOpenSlots: true
          }
        },
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
      tasks = await TaskSchema.aggregate([
        {
          $match: {
            status: 'open'
          }
        },
        {
          $addFields: {
            currentVolunteerCount: { $size: '$assignedVolunteers' },
            remainingSlots: {
              $subtract: ['$volunteersNeeded', { $size: '$assignedVolunteers' }]
            }
          }
        },
        {
          $match: {
            $expr: { $lt: [{ $size: '$assignedVolunteers' }, '$volunteersNeeded'] }
          }
        },
        {
          $sort: { _id: -1 }
        }
      ]);
      
      // Populate references after aggregation
      await TaskSchema.populate(tasks, [
        { path: 'aidRequest' },
        { path: 'donationRequest' },
        { path: 'assignedVolunteers' }
      ]);
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

    // Check if volunteer is already assigned
    const alreadyAssigned = task.assignedVolunteers.some(v => v.toString() === volunteerId.toString());
    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: 'You have already claimed this task'
      });
    }

    // Check if task has available slots
    if (task.assignedVolunteers.length >= task.volunteersNeeded) {
      return res.status(400).json({
        success: false,
        message: 'Task has no available slots'
      });
    }

    // Add volunteer to assignedVolunteers array
    task.assignedVolunteers.push(volunteerId);
    
    // If all slots are filled, change status to 'assigned'
    if (task.assignedVolunteers.length >= task.volunteersNeeded) {
      task.status = 'assigned';
    }
    
    await task.save();

    // Create notification for the volunteer who claimed
    // NOTE: FCM is now sent automatically via Notification model post-save hook
    await Notification.create({
      title: 'Task Claimed Successfully',
      body: `You have claimed: ${task.taskName}`,
      recipientId: volunteerId,
      type: 'task_assigned',
      data: { taskId: task._id.toString() },
    });

    console.log(`[claimTask] Task ${id} claimed by volunteer ${volunteerId}. Slots: ${task.assignedVolunteers.length}/${task.volunteersNeeded}`);

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

// Create task from aid request (Admin endpoint)
export const createTaskFromAidRequest = async (req, res) => {
  try {
    const { aidRequestId } = req.params;
    const { 
      taskName, 
      volunteersNeeded = 1, 
      assignedVolunteers = [],
      isOpen = false,
      priority = 'medium'
    } = req.body;

    console.log('[createTaskFromAidRequest] Aid Request ID:', aidRequestId);

    // Check if aid request exists
    const aidRequest = await AidRequest.findById(aidRequestId);
    if (!aidRequest) {
      return res.status(404).json({
        success: false,
        message: 'Aid request not found'
      });
    }

    // Check if a task already exists for this aid request
    const existingTask = await TaskSchema.findOne({ aidRequest: aidRequestId });
    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: 'A task already exists for this aid request'
      });
    }

    // Create the task - only include location if it has valid coordinates
    const taskData = {
      taskName: taskName || aidRequest.name || `Aid Request Task`,
      taskType: 'aid',
      status: isOpen ? 'open' : (assignedVolunteers.length > 0 ? 'assigned' : 'open'),
      priority: priority || aidRequest.priority,
      volunteersNeeded: volunteersNeeded,
      assignedVolunteers: isOpen ? [] : assignedVolunteers,
      aidRequest: aidRequestId,
      imageUrl: aidRequest.imageUrl,
    };
    
    // Only add location if it has valid coordinates
    if (aidRequest.location?.coordinates?.length === 2) {
      taskData.location = aidRequest.location;
    }
    
    const task = await TaskSchema.create(taskData);

    // Update aid request status to accepted (being processed)
    aidRequest.status = 'accepted';
    await aidRequest.save();

    console.log('[createTaskFromAidRequest] Task created:', task._id);

    // Notify Aid Requester if they are a registered user
    // NOTE: FCM is now sent automatically via Notification model post-save hook
    if (aidRequest.aidRequestedBy) {
        try {
            await Notification.create({
                title: 'Aid Request Accepted',
                body: `Your request "${aidRequest.calamityType}" is being processed. A task has been created.`,
                recipientId: aidRequest.aidRequestedBy,
                type: 'aid_request_accepted',
                data: { aidRequestId: aidRequest._id.toString(), taskId: task._id.toString() },
            });
            console.log(`[createTaskFromAidRequest] Created notification for user ${aidRequest.aidRequestedBy}`);
        } catch (error) {
            console.error('[createTaskFromAidRequest] Failed to create notification:', error);
        }
    }

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.error('[createTaskFromAidRequest] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating task from aid request'
    });
  }
};

// Search volunteers with filters
export const searchVolunteers = async (req, res) => {
  try {
    const { query, skill, available } = req.query;
    const UserProfile = (await import('../models/userProfile.js')).default;

    let filter = { role: 'volunteer', deletedAt: null };

    // Search by name or email
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ];
    }

    // Filter by skill
    if (skill) {
      filter.skill = skill;
    }

    const volunteers = await UserProfile.find(filter)
      .select('name email address skill phoneNumber')
      .limit(50);

    return res.status(200).json({
      success: true,
      data: volunteers
    });
  } catch (error) {
    console.error('[searchVolunteers] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error searching volunteers'
    });
  }
};