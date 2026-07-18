import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { UserRepository } from '../../../src/repositories/user.repository.js';
import { UserModel } from '../../../src/models/user.model.js';

describe('UserRepository', () => {
  let mongoServer: MongoMemoryServer;
  let userRepository: UserRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());

    userRepository = new UserRepository();
  });

  afterAll(async () => {
    await mongoose.disconnect();

    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.db?.dropDatabase();
  });

  it('should persist a newly registered user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed-password',
      role: 'USER',
    });

    const storedUser = await UserModel.findOne({
      email: 'john@example.com',
    });

    expect(storedUser).not.toBeNull();

    expect(storedUser?.name).toBe('John Doe');
    expect(storedUser?.email).toBe('john@example.com');
    expect(storedUser?.password).toBe('hashed-password');
    expect(storedUser?.role).toBe('USER');
  });

    it('should reject creating a user with an email address that already exists', async () => {
  await userRepository.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed-password',
    role: 'USER',
  });

  await expect(
    userRepository.create({
      name: 'Another User',
      email: 'john@example.com',
      password: 'another-password',
      role: 'USER',
    }),
  ).rejects.toThrow();
});

});