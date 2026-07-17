import { jest } from '@jest/globals';

import type {
  IUserRepository,
  UserResponse,
} from '../../../../src/types/auth.types.js';

export type MockUserRepository = {
  findByEmail: jest.MockedFunction<IUserRepository['findByEmail']>;
  create: jest.MockedFunction<IUserRepository['create']>;
};

export const createMockUserRepository = (): MockUserRepository => ({
  findByEmail: jest.fn<IUserRepository['findByEmail']>(),

  create: jest.fn<IUserRepository['create']>(),
});

export const createMockUserResponse = (
  data?: Partial<UserResponse>,
): UserResponse => ({
  name: data?.name ?? 'John Do',
  email: data?.email ?? 'john@example.com',
  role: data?.role ?? 'USER',
});
