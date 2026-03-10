
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Notification from './src/models/Notification.js';

dotenv.config();

const checkNotifications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to DB');

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    console.log('--- LAST 5 NOTIFICATIONS ---');
    notifications.forEach(n => {
      console.log(`[${n.targetUserType}] ${n.title} (Recipient: ${n.recipientId})`);
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkNotifications();
