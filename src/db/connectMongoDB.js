import mongoose from 'mongoose';
import { Note } from '../models/note.js';

export async function connectMongoDB() {
  try {
    const MongoUrl = process.env.MONGO_URL;
    await mongoose.connect(MongoUrl);
    console.log('✅ MongoDB connection established successfully');
    await Note.syncIndexes();
    console.log('Indexes synced successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}
