import { jest } from '@jest/globals';

import type { IUserRepository } from '../../../../src/types/auth.types.js';

export type MockUserRepository = {
  findByEmail: jest.MockedFunction<IUserRepository['findByEmail']>;
  create: jest.MockedFunction<IUserRepository['create']>;
};

export const createMockUserRepository =
  (): MockUserRepository => ({
    findByEmail: jest.fn<IUserRepository['findByEmail']>(),
    create: jest.fn<IUserRepository['create']>(),
  });