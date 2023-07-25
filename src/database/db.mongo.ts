

import mongoose from 'mongoose';
/**
 * Handles database connectivity and configurations.
 *
 * @author Aravinda Meewalaarachchi
 */

const DB_USERNAME = process.env.DB_USERNAME, DB_PWD =  process.env.DB_PWD;

if (!DB_USERNAME || !DB_PWD) {
  throw new Error(
    'Please define the DB_USERNAME and DB_PWD environment variable inside .env',
  );
}

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PWD}@cluster0.jwrama9.mongodb.net/misisipi`;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

// Check the cached before initializing a new instance.
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection with the MongoDB database using Mongoose.
 * If a connection is already established, it returns the existing connection from the cache.
 * If a connection is not already established, it creates a new connection using the provided MongoDB URI
 * and caches the connection for future use.
 * @returns {Promise<mongoose.Connection>} A promise that resolves to a mongoose.Connection object.
 */
export async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };
    mongoose.set('strictQuery', false);
    cached.promise = mongoose
    .connect(MONGODB_URI, opts)
    .then((mongoose) => {
      console.info('Successfully connected to MongoDB instance.....');
      return mongoose;
    })
    .catch((error) => {
      console?.error('Failed to connect to MongoDB:', error);
      throw error; // Rethrow the error to be caught in the calling code
    });  
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

