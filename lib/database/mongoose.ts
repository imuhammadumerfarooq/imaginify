import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    console.error('Missing MONGODB_URL');
    throw new Error('Missing MONGODB_URL');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: 'Imaginify-1', bufferCommands: false,
    }).then(mongoose => {
      console.log('Connected to MongoDB');
      return mongoose;
    }).catch(error => {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};
