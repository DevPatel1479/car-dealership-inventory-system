// import mongoose from 'mongoose';

// export async function connectDatabase(): Promise<void> {
//   const mongoUri = process.env.MONGODB_URI;

//   if (!mongoUri) {
//     throw new Error('MONGODB_URI environment variable is not configured');
//   }

//   await mongoose.connect(mongoUri);
// }

import mongoose from 'mongoose';

let isConnected = false;

export async function connectDatabase(): Promise<void> {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI!);

  isConnected = true;

  console.log('MongoDB connected');
}
