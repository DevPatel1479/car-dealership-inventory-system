import 'dotenv/config';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { connectDatabase } from '../src/config/database.js';
import { UserModel } from '../src/models/user.model.js';

async function seedAdmin(): Promise<void> {
  await connectDatabase();

  console.log('Connected to MongoDB');

  const adminEmail = 'admin@example.com';

  const existingAdmin = await UserModel.findOne({
    email: adminEmail,
  });

  if (existingAdmin) {
    console.log('Admin user already exists.');

    await mongoose.disconnect();

    console.log('Database connection closed');

    return;
  }

  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  await UserModel.create({
    name: 'Administrator',
    email: adminEmail,
    password: hashedPassword,
    role: 'ADMIN',
  });

  console.log('----------------------------------------');
  console.log('Admin user created successfully.');
  console.log('');
  console.log('Email    : admin@example.com');
  console.log('Password : Admin@123');
  console.log('Role     : ADMIN');
  console.log('----------------------------------------');

  await mongoose.disconnect();

  console.log('Database connection closed');
}

seedAdmin().catch(async (error) => {
  console.error(error);

  await mongoose.disconnect();

  process.exit(1);
});