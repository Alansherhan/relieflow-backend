import TaskSchema from '../models/Task.js';
import AidRequest from '../models/AidRequest.js';
import DonationRequest from '../models/DonationRequest.js';
import Notification from '../models/Notification.js';
import PortalDonation from '../models/PortalDonation.js';
import { uploadFileToCloudinary } from '../services/cloudinaryStorage.js';
// FCM is now sent automatically via Notification model post-save hook

export const assignTask = async (req, res) => {
  const taskName = req.body.taskName;
  const taskType = req.body.taskType;
  const assignedVolunteers = req.body.assignedVolunteers || [];
  const donationRequest = req.body.donationRequest;
  const volunteersNeeded = req.body.volunteersNeeded || 1;
  const priority = req.body.priority || 'low';
  // Location fields
  const pickupLocation = req.body.pickupLocation;
  const pickupAddress = req.body.pickupAddress;
  const deliveryLocation = req.body.deliveryLocation;
  const deliveryAddress = req.body.deliveryAddress;

  try {
    const taskData = {
      taskName: taskName,
      taskType: taskType,
      status: assignedVolunteers.length > 0 ? 'assigned' : 'open',
      priority: priority,
      volunteersNeeded: volunteersNeeded,
      assignedVolunteers: assignedVolunteers,
      donationRequest: donationRequest,
    };

    // Add pickup location if provided (donor's location for pickup)
    if (pickupLocation?.coordinates?.length === 2) {
      taskData.pickupLocation = pickupLocation;
      taskData.location = pickupLocation; // Legacy support
    }
    if (pickupAddress) {
      taskData.pickupAddress = pickupAddress;
    }

    // Add delivery location if provided (beneficiary's location)
    if (deliveryLocation?.coordinates?.length === 2) {
      taskData.deliveryLocation = deliveryLocation;
    }
    if (deliveryAddress) {
      taskData.deliveryAddress = deliveryAddress;
    }

    const taskAssigned = await TaskSchema.create(taskData);

    return res.status(201).json({
      success: true,
      message: taskAssigned,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Error',
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskSchema.find()
      .populate('assignedVolunteers')
      .sort({ _id: -1 });
    console.log(allTasks);
    return res.status(200).json({
      success: true,
      message: allTasks,
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete',
    });
  }
};

// Get a single task by ID for the logged-in volunteer
export const getTaskById = async (req, res) => {
  try {
    const volunteerId = req.user.id || req.user._id;
    const { id } = req.params;

    console.log('[getTaskById] Volunteer ID:', volunteerId, 'Task ID:', id);

    // First, try to find task that belongs to this volunteer
    let task = await TaskSchema.findOne({
      _id: id,
      assignedVolunteers: volunteerId,
    })
      .populate({
        path: 'aidRequest',
        populate: {
          path: 'aidRequestedBy',
          model: 'userProfile',
        },
      })
      .populate({
        path: 'donationRequest',
        populate: {
          path: 'requestedBy',
          model: 'userProfile',
        },
      })
      .populate('assignedVolunteers');

    // If not found, check if it's an open task (available for claiming from notification)
    if (!task) {
      console.log(
        '[getTaskById] Not assigned to volunteer, checking if open task...'
      );
      task = await TaskSchema.findOne({
        _id: id,
        status: { $in: ['open', 'accepted'] }, // Open tasks or partially assigned
      })
        .populate({
          path: 'aidRequest',
          populate: {
            path: 'aidRequestedBy',
            model: 'userProfile',
          },
        })
        .populate({
          path: 'donationRequest',
          populate: {
            path: 'requestedBy',
            model: 'userProfile',
          },
        })
        .populate('assignedVolunteers');
    }

    if (!task) {
      console.log('[getTaskById] Task not found or not accessible');
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have access to this task',
      });
    }

    console.log('[getTaskById] Task found:', task._id, 'Status:', task.status);
    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log('[getTaskById] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: error.message,
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
    if (
      status &&
      ['assigned', 'accepted', 'completed', 'rejected'].includes(
        status.toLowerCase()
      )
    ) {
      query.status = status.toLowerCase();
    }

    const tasks = await TaskSchema.find(query)
      .populate({
        path: 'aidRequest',
        populate: {
          path: 'aidRequestedBy',
          model: 'userProfile',
        },
      })
      .populate({
        path: 'donationRequest',
        populate: {
          path: 'requestedBy',
          model: 'userProfile',
        },
      })
      .populate('assignedVolunteers') // Keep this one simple or populate if needed
      .sort({ _id: -1 }); // Newest first

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
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
        message: 'Invalid status. Must be: accepted, rejected, or completed',
      });
    }

    // Find task and verify this volunteer is assigned
    const task = await TaskSchema.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Check if volunteer is in assignedVolunteers array
    const isAssigned = task.assignedVolunteers.some(
      (v) => v.toString() === volunteerId.toString()
    );
    if (!isAssigned) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    // Update status
    task.status = status.toLowerCase();
    await task.save();

    console.log(`[updateTaskStatus] Task ${id} updated to ${status}`);

    // Send notifications based on new status
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === 'accepted') {
      // Notify volunteer of successful acceptance
      try {
        await Notification.create({
          title: 'Task Accepted',
          body: `You have accepted: ${task.taskName}`,
          recipientId: volunteerId,
          type: 'task_assigned',
          data: { taskId: task._id.toString() },
        });
        console.log(
          `[updateTaskStatus] Notification sent to volunteer ${volunteerId}`
        );
      } catch (notifErr) {
        console.error(
          '[updateTaskStatus] Error sending volunteer notification:',
          notifErr
        );
      }

      // Notify public user that volunteer is working on their request
      try {
        const populatedTask = await TaskSchema.findById(id)
          .populate('aidRequest')
          .populate('donationRequest')
          .populate(
            'assignedVolunteers',
            'name phoneNumber skill profileImage'
          );

        const requesterId =
          populatedTask.aidRequest?.aidRequestedBy ||
          populatedTask.donationRequest?.requestedBy;

        // Get volunteer info for notification
        const volunteer = populatedTask.assignedVolunteers?.find(
          (v) => v._id.toString() === volunteerId.toString()
        );

        if (requesterId) {
          await Notification.create({
            title: 'Volunteer Assigned',
            body: volunteer?.name
              ? `${volunteer.name} has accepted your request and is now working on it.`
              : 'A volunteer has accepted your request and is now working on it.',
            recipientId: requesterId,
            type: 'aid_request_in_progress',
            data: {
              taskId: task._id.toString(),
              volunteerName: volunteer?.name || null,
              volunteerPhone: volunteer?.phoneNumber || null,
              volunteerSkill: volunteer?.skill || null,
              aidRequestId: populatedTask.aidRequest?._id?.toString() || null,
              donationRequestId:
                populatedTask.donationRequest?._id?.toString() || null,
            },
          });
          console.log(
            `[updateTaskStatus] Notification sent to requester ${requesterId}`
          );
        }
      } catch (notifErr) {
        console.error(
          '[updateTaskStatus] Error sending requester notification:',
          notifErr
        );
      }
    } else if (normalizedStatus === 'completed') {
      // Notify volunteer of successful completion
      try {
        await Notification.create({
          title: 'Task Completed',
          body: `You have successfully completed: ${task.taskName}`,
          recipientId: volunteerId,
          type: 'task_assigned',
          data: { taskId: task._id.toString() },
        });
        console.log(
          `[updateTaskStatus] Completion notification sent to volunteer ${volunteerId}`
        );
      } catch (notifErr) {
        console.error(
          '[updateTaskStatus] Error sending volunteer completion notification:',
          notifErr
        );
      }

      // Notify public user that request is complete
      try {
        const populatedTask = await TaskSchema.findById(id)
          .populate('aidRequest')
          .populate('donationRequest')
          .populate({
            path: 'aidRequest',
            populate: { path: 'calamityType', select: 'calamityName' },
          });

        const requesterId =
          populatedTask.aidRequest?.aidRequestedBy ||
          populatedTask.donationRequest?.requestedBy;
        if (requesterId) {
          const isAidRequest = task.taskType === 'aid';
          const requestType = isAidRequest
            ? 'aid_request_completed'
            : 'donation_request_completed';

          // Build descriptive notification body
          let notificationBody;
          let notificationData = { taskId: task._id.toString() };

          if (isAidRequest && populatedTask.aidRequest) {
            const calamityName =
              populatedTask.aidRequest.calamityType?.calamityName || 'aid';
            notificationBody = `Your ${calamityName} request has been completed.`;
            notificationData.aidRequestId =
              populatedTask.aidRequest._id.toString();
          } else if (populatedTask.donationRequest) {
            const title = populatedTask.donationRequest.title || 'donation';
            notificationBody = `Your donation request "${title}" has been completed.`;
            notificationData.donationRequestId =
              populatedTask.donationRequest._id.toString();
          } else {
            notificationBody = 'Your request has been completed.';
          }

          await Notification.create({
            title: 'Request Completed',
            body: notificationBody,
            recipientId: requesterId,
            type: requestType,
            data: notificationData,
          });
          console.log(
            `[updateTaskStatus] Completion notification sent to requester ${requesterId}`
          );
        }
      } catch (notifErr) {
        console.error(
          '[updateTaskStatus] Error sending requester completion notification:',
          notifErr
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Task status updated',
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error updating task status',
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
        message: 'Proof image is required to complete the task',
      });
    }

    // Find task and verify this volunteer is assigned
    const task = await TaskSchema.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Check if volunteer is in assignedVolunteers array
    const isAssigned = task.assignedVolunteers.some(
      (v) => v.toString() === volunteerId.toString()
    );
    if (!isAssigned) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this task',
      });
    }

    // Check if task is in accepted state (can only complete accepted tasks)
    if (task.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'Can only complete tasks that are in accepted status',
      });
    }

    // Upload proof image to Cloudinary
    const proofImageUrl = await uploadFileToCloudinary(req.file, 'proof_images');

    // Update task with proof image and completion status
    task.status = 'completed';
    task.proofImageUrl = proofImageUrl;
    task.completedAt = new Date();
    await task.save();

    console.log(
      `[completeTaskWithProof] Task ${id} completed with proof: ${proofImageUrl}`
    );

    // Send completion notifications
    // 1. Notify the volunteer
    try {
      await Notification.create({
        title: 'Task Completed',
        body: `You have successfully completed: ${task.taskName}`,
        recipientId: volunteerId,
        type: 'task_assigned',
        data: { taskId: task._id.toString() },
      });
      console.log(
        `[completeTaskWithProof] Completion notification sent to volunteer ${volunteerId}`
      );
    } catch (notifErr) {
      console.error(
        '[completeTaskWithProof] Error sending volunteer completion notification:',
        notifErr
      );
    }

    // 2. Notify the public user (for aid requests immediately; for donation requests after fulfillment check)
    // For aid requests, send notification right away since there's no partial fulfillment concept
    try {
      const populatedTask = await TaskSchema.findById(id)
        .populate('aidRequest')
        .populate('donationRequest')
        .populate({
          path: 'aidRequest',
          populate: { path: 'calamityType', select: 'calamityName' },
        });

      const isAidRequest = task.taskType === 'aid';
      const requesterId =
        populatedTask.aidRequest?.aidRequestedBy ||
        populatedTask.donationRequest?.requestedBy;

      // For aid requests, notify immediately (no partial fulfillment concept)
      if (isAidRequest && requesterId && populatedTask.aidRequest) {
        const calamityName =
          populatedTask.aidRequest.calamityType?.calamityName || 'aid';
        await Notification.create({
          title: 'Request Completed',
          body: `Your ${calamityName} request has been completed.`,
          recipientId: requesterId,
          type: 'aid_request_completed',
          data: {
            taskId: task._id.toString(),
            aidRequestId: populatedTask.aidRequest._id.toString(),
          },
        });
        console.log(
          `[completeTaskWithProof] Completion notification sent to requester ${requesterId}`
        );
      }

      // Sync PortalDonation status for pickup tasks
      // When volunteer completes a pickup task, update linked PortalDonation to completed
      // and update the DonationRequest fulfillment quantities
      const portalDonation = await PortalDonation.findOne({
        pickupTask: task._id,
      });
      if (portalDonation && portalDonation.status === 'pickup_scheduled') {
        portalDonation.status = 'completed';
        await portalDonation.save();
        console.log(
          `[completeTaskWithProof] PortalDonation ${portalDonation._id} updated to completed`
        );

        // NOW update the DonationRequest fulfilled quantities (items have been delivered)
        if (
          portalDonation.donationRequest &&
          portalDonation.itemDetails &&
          portalDonation.itemDetails.length > 0
        ) {
          const donationRequest = await DonationRequest.findById(
            portalDonation.donationRequest
          );
          if (donationRequest && donationRequest.itemDetails) {
            portalDonation.itemDetails.forEach((donatedItem) => {
              // Match by requestItemId first (handles multiple items with same category),
              // fall back to category match for backward compatibility
              const requestItem = donatedItem.requestItemId
                ? donationRequest.itemDetails.find(
                    (ri) => ri._id.toString() === donatedItem.requestItemId.toString()
                  )
                : donationRequest.itemDetails.find(
                    (ri) => ri.category === donatedItem.category
                  );
              if (requestItem) {
                requestItem.fulfilledQuantity =
                  (requestItem.fulfilledQuantity || 0) +
                  (donatedItem.quantity || 0);
              }
            });

            // Check fulfillment status
            const allFulfilled = donationRequest.itemDetails.every(
              (item) => (item.fulfilledQuantity || 0) >= item.quantity
            );
            const partiallyFulfilled = donationRequest.itemDetails.some(
              (item) => (item.fulfilledQuantity || 0) > 0
            );

            if (allFulfilled) {
              donationRequest.status = 'completed';
            } else if (partiallyFulfilled) {
              donationRequest.status = 'partially_fulfilled';
            }

            await donationRequest.save();
            console.log(
              `[completeTaskWithProof] Updated DonationRequest ${donationRequest._id} fulfillment`
            );

            // Notify the requester for both partial and full fulfillment
            if ((allFulfilled || partiallyFulfilled) && requesterId) {
              const title = donationRequest.title || 'donation';
              const notificationType = allFulfilled
                ? 'donation_request_completed'
                : 'donation_request_partially_fulfilled';
              const notificationTitle = allFulfilled
                ? 'Request Completed'
                : 'Items Received!';
              const notificationBody = allFulfilled
                ? `Great news! Your donation request "${title}" has been fully fulfilled.`
                : `Some items have been donated to your request "${title}".`;

              await Notification.create({
                title: notificationTitle,
                body: notificationBody,
                recipientId: requesterId,
                type: notificationType,
                data: {
                  taskId: task._id.toString(),
                  donationRequestId: donationRequest._id.toString(),
                },
              });
              console.log(
                `[completeTaskWithProof] ${notificationType} notification sent to requester ${requesterId}`
              );
            }
          }
        }
      }
    } catch (error) {
      console.error(
        '[completeTaskWithProof] Error syncing PortalDonation status or sending requester notification:',
        error
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Task completed successfully',
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error completing task',
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
            status: { $in: ['open', 'accepted'] },
          },
        },
        {
          $addFields: {
            currentVolunteerCount: { $size: '$assignedVolunteers' },
            hasOpenSlots: {
              $lt: [{ $size: '$assignedVolunteers' }, '$volunteersNeeded'],
            },
          },
        },
        {
          $match: {
            hasOpenSlots: true,
          },
        },
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            distanceField: 'distance',
            spherical: true,
            maxDistance: 50000, // 50km radius
          },
        },
      ]);
    } else {
      tasks = await TaskSchema.aggregate([
        {
          $match: {
            status: { $in: ['open', 'accepted'] },
          },
        },
        {
          $addFields: {
            currentVolunteerCount: { $size: '$assignedVolunteers' },
            remainingSlots: {
              $subtract: [
                '$volunteersNeeded',
                { $size: '$assignedVolunteers' },
              ],
            },
          },
        },
        {
          $match: {
            $expr: {
              $lt: [{ $size: '$assignedVolunteers' }, '$volunteersNeeded'],
            },
          },
        },
        {
          $sort: { _id: -1 },
        },
      ]);

      // Populate references after aggregation
      await TaskSchema.populate(tasks, [
        {
          path: 'aidRequest',
          populate: {
            path: 'aidRequestedBy',
            model: 'userProfile',
          },
        },
        {
          path: 'donationRequest',
          populate: {
            path: 'requestedBy',
            model: 'userProfile',
          },
        },
        { path: 'assignedVolunteers' },
      ]);
    }

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error('[getOpenTasks] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching open tasks',
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

    // Find task and populate aidRequest to get requester details
    const task = await TaskSchema.findById(id).populate('aidRequest');
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Check if task is still open
    if (task.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'Task is no longer available for claiming',
      });
    }

    // Check if volunteer is already assigned
    const alreadyAssigned = task.assignedVolunteers.some(
      (v) => v.toString() === volunteerId.toString()
    );
    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: 'You have already claimed this task',
      });
    }

    // Check if task has available slots
    if (task.assignedVolunteers.length >= task.volunteersNeeded) {
      return res.status(400).json({
        success: false,
        message: 'Task has no available slots',
      });
    }

    // Add volunteer to assignedVolunteers array
    task.assignedVolunteers.push(volunteerId);

    // DIRECTLY ACCEPT TASK (Skip 'assigned' status)
    // Even if multiple slots, if someone claims, it's considered "active/accepted"
    // Note: getOpenTasks must now include 'accepted' tasks with open slots
    task.status = 'accepted';

    await task.save();

    console.log(
      `[claimTask] Task ${id} claimed/accepted by volunteer ${volunteerId}`
    );

    // Create notification for the volunteer
    try {
      await Notification.create({
        title: 'Task Accepted',
        body: `You are now working on: ${task.taskName}`,
        recipientId: volunteerId,
        type: 'task_assigned',
        data: { taskId: task._id.toString() },
      });
    } catch (error) {
      console.error(
        '[claimTask] Error creating volunteer notification:',
        error
      );
    }

    // Notify public user immediately
    // (Moved from updateTaskStatus since we skip the manual accept step)
    try {
      // Fetch volunteer info for the notification
      const User = (await import('../models/userProfile.js')).default;
      const volunteer = await User.findById(volunteerId).select(
        'name phoneNumber skill'
      );

      // Re-fetch task with populated donationRequest if needed
      const populatedTask = await TaskSchema.findById(id)
        .populate('aidRequest')
        .populate('donationRequest');

      const reqId =
        populatedTask.aidRequest?.aidRequestedBy ||
        populatedTask.donationRequest?.requestedBy;
      if (reqId) {
        await Notification.create({
          title: 'Volunteer Assigned',
          body: volunteer?.name
            ? `${volunteer.name} has accepted your request and is now working on it.`
            : 'A volunteer has accepted your request and is now working on it.',
          recipientId: reqId,
          type: 'aid_request_in_progress',
          data: {
            taskId: task._id.toString(),
            volunteerName: volunteer?.name || null,
            volunteerPhone: volunteer?.phoneNumber || null,
            volunteerSkill: volunteer?.skill || null,
            aidRequestId: populatedTask.aidRequest?._id?.toString() || null,
            donationRequestId:
              populatedTask.donationRequest?._id?.toString() || null,
          },
        });
        console.log(`[claimTask] Notification sent to requester ${reqId}`);
      }
    } catch (error) {
      console.error(
        '[claimTask] Error creating requester notification:',
        error
      );
    }

    // Sync PortalDonation status for pickup tasks
    // When volunteer claims a pickup task, update linked PortalDonation to pickup_scheduled
    try {
      const portalDonation = await PortalDonation.findOne({
        pickupTask: task._id,
      });
      if (portalDonation && portalDonation.status === 'awaiting_volunteer') {
        portalDonation.status = 'pickup_scheduled';
        await portalDonation.save();
        console.log(
          `[claimTask] PortalDonation ${portalDonation._id} updated to pickup_scheduled`
        );
      }
    } catch (error) {
      console.error('[claimTask] Error syncing PortalDonation status:', error);
    }

    return res.status(200).json({
      success: true,
      message: 'Task claimed and accepted successfully',
      data: task,
    });
  } catch (error) {
    console.error('[claimTask] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error claiming task',
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
      priority = 'medium',
    } = req.body;

    console.log('[createTaskFromAidRequest] Aid Request ID:', aidRequestId);

    // Check if aid request exists
    const aidRequest = await AidRequest.findById(aidRequestId);
    if (!aidRequest) {
      return res.status(404).json({
        success: false,
        message: 'Aid request not found',
      });
    }

    // Ensure the aid request has been accepted before creating a task
    if (aidRequest.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: `Cannot create a task for an aid request with status '${aidRequest.status}'. Only accepted aid requests can have tasks.`,
      });
    }

    // Check if a task already exists for this aid request
    const existingTask = await TaskSchema.findOne({ aidRequest: aidRequestId });
    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: 'A task already exists for this aid request',
      });
    }

    // Create the task - only include location if it has valid coordinates
    const taskData = {
      taskName: taskName || aidRequest.name || `Aid Request Task`,
      taskType: 'aid',
      status: isOpen
        ? 'open'
        : assignedVolunteers.length > 0
          ? 'assigned'
          : 'open',
      priority: priority || aidRequest.priority,
      volunteersNeeded: volunteersNeeded,
      assignedVolunteers: isOpen ? [] : assignedVolunteers,
      aidRequest: aidRequestId,
      imageUrl: aidRequest.imageUrl,
    };

    // Add delivery location (beneficiary's location) from aid request
    if (aidRequest.location?.coordinates?.length === 2) {
      taskData.deliveryLocation = aidRequest.location;
      taskData.location = aidRequest.location; // Legacy support
    }

    // Add delivery address from aid request
    if (aidRequest.address) {
      taskData.deliveryAddress = {
        addressLine1: aidRequest.address.addressLine1,
        addressLine2: aidRequest.address.addressLine2,
        addressLine3: aidRequest.address.addressLine3,
        pinCode: aidRequest.address.pinCode,
      };
    }

    const task = await TaskSchema.create(taskData);

    // Check if it was already accepted to avoid duplicate notifications
    const isAlreadyAccepted = aidRequest.status === 'accepted';

    // Update aid request status to accepted (being processed)
    aidRequest.status = 'accepted';
    await aidRequest.save();

    console.log('[createTaskFromAidRequest] Task created:', task._id);

    // Notify Aid Requester if they are a registered user AND it wasn't already accepted
    // NOTE: FCM is now sent automatically via Notification model post-save hook
    if (aidRequest.aidRequestedBy && !isAlreadyAccepted) {
      try {
        await Notification.create({
          title: 'Aid Request Accepted',
          body: `Your request "${aidRequest.calamityType}" is being processed. A task has been created.`,
          recipientId: aidRequest.aidRequestedBy,
          type: 'aid_request_accepted',
          data: {
            aidRequestId: aidRequest._id.toString(),
            taskId: task._id.toString(),
          },
        });
        console.log(
          `[createTaskFromAidRequest] Created notification for user ${aidRequest.aidRequestedBy}`
        );
      } catch (error) {
        console.error(
          '[createTaskFromAidRequest] Failed to create notification:',
          error
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    console.error('[createTaskFromAidRequest] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating task from aid request',
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
        { email: { $regex: query, $options: 'i' } },
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
      data: volunteers,
    });
  } catch (error) {
    console.error('[searchVolunteers] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error searching volunteers',
    });
  }
};
