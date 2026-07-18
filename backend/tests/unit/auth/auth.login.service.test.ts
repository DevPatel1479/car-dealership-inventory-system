import { describe, expect, it, jest } from '@jest/globals';

import { AuthService } from '../../../src/services/auth.service.js';

import {
  createMockUserRepository,
  createMockUserRecord,
} from './test-helpers/auth-test.factory.js';

describe('AuthService - User Login', () => {
  it('should authenticate user with valid credentials', async () => {
    const userRepository = createMockUserRepository();

    userRepository.findByEmail.mockResolvedValue(
      createMockUserRecord({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed-password',
        role: 'USER',
      }),
    );

    const passwordService = {
      compare: jest.fn().mockResolvedValue(true),
    };

    const authService = new AuthService(userRepository, passwordService as any);

    const result = await authService.login({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(result).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      token: expect.any(String),
    });
  });

  it('should reject login when credentials are invalid', async () => {
    const userRepository = createMockUserRepository();

    userRepository.findByEmail.mockResolvedValue(null);

    const passwordService = {
      compare: jest.fn(),
    };

    const authService = new AuthService(userRepository, passwordService as any);

    await expect(
      authService.login({
        email: 'unknown@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow('Invalid credentials');

    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      'unknown@example.com',
    );

    expect(passwordService.compare).not.toHaveBeenCalled();
  });


  it('should reject login when password is incorrect', async () => {
  const userRepository = createMockUserRepository();

  userRepository.findByEmail.mockResolvedValue(
    createMockUserRecord({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed-password',
      role: 'USER',
    }),
  );

  const passwordService = {
    compare: jest.fn().mockResolvedValue(false),
  };

  const authService = new AuthService(
    userRepository,
    passwordService as any,
  );

  await expect(
    authService.login({
      email: 'john@example.com',
      password: 'wrong-password',
    }),
  ).rejects.toThrow('Invalid credentials');


  expect(passwordService.compare).toHaveBeenCalledWith(
    'wrong-password',
    'hashed-password',
  );
});

});



