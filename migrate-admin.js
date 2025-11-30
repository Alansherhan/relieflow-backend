// migrate-passwords.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import adminUser from './src/models/adminUser.js';

dotenv.config();

async function migratePasswords() {
  await mongoose.connect(process.env.MONGO_URL);

  const admins = await adminUser.find({});

  for (const admin of admins) {
    // Check if password is already hashed (bcrypt hashes start with $2b$)
    if (!admin.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
      await admin.save({ validateBeforeSave: false });
      console.log(`Migrated password for ${admin.email}`);
    }
  }

  console.log('Migration complete');
  await mongoose.connection.close();
}

migratePasswords();
