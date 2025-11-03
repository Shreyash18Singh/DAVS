import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var __mongooseClient: { conn?: typeof mongoose } | undefined;
}

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gyaanguru';

export async function connect() {
  if (!MONGO_URI) throw new Error('Please define the MONGO_URI environment variable');

  if (global.__mongooseClient?.conn) {
    return global.__mongooseClient.conn;
  }

  if (!global.__mongooseClient) global.__mongooseClient = {};

  const conn = await mongoose.connect(MONGO_URI);
  global.__mongooseClient.conn = conn;
  return conn;
}
