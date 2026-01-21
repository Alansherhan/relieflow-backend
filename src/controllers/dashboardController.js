import Task from '../models/Task.js';
import AidRequest from '../models/AidRequest.js';
import DonationRequest from '../models/DonationRequest.js';
import userProfile from '../models/userProfile.js';
import ReliefCenter from '../models/ReliefCenter.js';
import AdminWallet from '../models/AdminWallet.js';

/**
 * Dashboard Statistics Controller
 * Aggregates data for the AdminJS dashboard
 */
export const getDashboardStats = async (req, res) => {
  try {
    // Get current date info for monthly stats
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // Parallel fetch all statistics
    const [
      // Task statistics by status
      taskStats,
      // Aid Request statistics by status
      aidRequestStats,
      // Donation Request statistics
      donationRequestStats,
      // User/Volunteer counts
      userStats,
      // Relief Centers
      reliefCenters,
      // Wallet info
      wallet,
      // Recent tasks (last 4)
      recentTasks,
      // Recent aid requests (last 4)
      recentAidRequests,
      // Monthly task counts
      monthlyTaskData,
      // Monthly aid request counts
      monthlyAidData,
      // Priority distribution
      priorityStats,
    ] = await Promise.all([
      // Task stats aggregation
      Task.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),

      // Aid Request stats aggregation
      AidRequest.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),

      // Donation Request stats
      DonationRequest.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$amount' },
          },
        },
      ]),

      // User stats
      userProfile.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 },
          },
        },
      ]),

      // Relief Centers (limit 5)
      ReliefCenter.find().limit(5).lean(),

      // Get wallet
      AdminWallet.getMainWallet(),

      // Recent tasks
      Task.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .populate('assignedVolunteers', 'name profileImage')
        .lean(),

      // Recent aid requests
      AidRequest.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .populate('calamityType')
        .lean(),

      // Monthly task data (last 6 months)
      Task.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]),

      // Monthly aid request data
      AidRequest.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]),

      // Priority distribution across tasks and aid requests
      Task.aggregate([
        {
          $match: { status: { $nin: ['completed', 'rejected'] } },
        },
        {
          $group: {
            _id: '$priority',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    // Transform task stats into object
    const tasks = {
      open: 0,
      assigned: 0,
      accepted: 0,
      completed: 0,
      rejected: 0,
      total: 0,
    };
    taskStats.forEach((stat) => {
      if (stat._id && tasks.hasOwnProperty(stat._id)) {
        tasks[stat._id] = stat.count;
      }
      tasks.total += stat.count;
    });

    // Transform aid request stats
    const aidRequests = {
      pending: 0,
      accepted: 0,
      completed: 0,
      rejected: 0,
      total: 0,
    };
    aidRequestStats.forEach((stat) => {
      if (stat._id && aidRequests.hasOwnProperty(stat._id)) {
        aidRequests[stat._id] = stat.count;
      }
      aidRequests.total += stat.count;
    });

    // Transform donation request stats
    const donationRequests = {
      pending: 0,
      accepted: 0,
      completed: 0,
      partially_fulfilled: 0,
      rejected: 0,
      total: 0,
      totalAmount: 0,
    };
    donationRequestStats.forEach((stat) => {
      if (stat._id && donationRequests.hasOwnProperty(stat._id)) {
        donationRequests[stat._id] = stat.count;
      }
      donationRequests.total += stat.count;
      donationRequests.totalAmount += stat.totalAmount || 0;
    });

    // Transform user stats
    const users = {
      volunteers: 0,
      public: 0,
      total: 0,
    };
    userStats.forEach((stat) => {
      if (stat._id === 'volunteer') {
        users.volunteers = stat.count;
      } else if (stat._id === 'public') {
        users.public = stat.count;
      }
      users.total += stat.count;
    });

    // Transform priority stats
    const priorities = {
      high: 0,
      medium: 0,
      low: 0,
    };
    priorityStats.forEach((stat) => {
      if (stat._id && priorities.hasOwnProperty(stat._id)) {
        priorities[stat._id] = stat.count;
      }
    });

    // Format monthly data for charts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyStats = [];
    
    // Create 6 month data points
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      const taskData = monthlyTaskData.find(
        (d) => d._id.year === year && d._id.month === month
      );
      const aidData = monthlyAidData.find(
        (d) => d._id.year === year && d._id.month === month
      );

      monthlyStats.push({
        month: months[month - 1],
        tasks: taskData ? taskData.count : 0,
        aidRequests: aidData ? aidData.count : 0,
      });
    }

    res.json({
      success: true,
      data: {
        tasks,
        aidRequests,
        donationRequests,
        users,
        priorities,
        wallet: wallet ? {
          balance: wallet.balance,
          totalCredits: wallet.totalCredits,
          totalDebits: wallet.totalDebits,
          donorCount: wallet.donorCount,
        } : null,
        reliefCenters: reliefCenters.map((rc) => ({
          id: rc._id,
          name: rc.shelterName,
          coordinator: rc.coordinatorName,
          phone: rc.coordinatorNumber,
        })),
        recentTasks: recentTasks.map((task) => ({
          id: task._id,
          name: task.taskName,
          status: task.status,
          priority: task.priority,
          type: task.taskType,
          volunteers: task.assignedVolunteers?.length || 0,
          volunteersNeeded: task.volunteersNeeded,
          createdAt: task.createdAt,
        })),
        recentAidRequests: recentAidRequests.map((req) => ({
          id: req._id,
          calamityType: req.calamityType?.calamityName || 'Unknown',
          status: req.status,
          priority: req.priority,
          createdAt: req.createdAt,
        })),
        monthlyStats,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics',
    });
  }
};
