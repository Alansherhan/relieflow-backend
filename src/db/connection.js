// src/db/connection.js
import { MongoClient } from 'mongodb';

let db = null;
let client = null;

export const connectDB = async () => {
  try {
    if (db) {
      console.log('Database already connected');
      return db;
    }

    const mongoUrl = process.env.MONGO_URL;
    
    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined in environment variables');
    }

    client = new MongoClient(mongoUrl);
    await client.connect();
    
    // Replace 'volunteer_app' with your actual database name
    db = client.db('volunteer_app');
    
    console.log('✅ Connected to MongoDB successfully');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};