import 'dotenv/config';

import mongoose from 'mongoose';

import {
  beforeAll,
  afterEach,
  afterAll,
} from '@jest/globals';


beforeAll(async () => {
  await mongoose.connect(
    process.env.TEST_DATABASE_URL!,
  );
});


afterEach(async () => {
  await mongoose.connection
    .collection('users')
    .deleteMany({});
});


afterAll(async () => {
  await mongoose.disconnect();
});