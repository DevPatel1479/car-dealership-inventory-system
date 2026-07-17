import { describe, expect, it, jest } from '@jest/globals';

import { AuthService } from '../../../src/services/auth.service.js';

import { createMockUserRepository } from './test-helpers/auth-test.factory.js';


describe('AuthService - User Registration', () => {
  it('should create a new user account when valid registration details are provided', async () => {
    const userRepository = createMockUserRepository();

    userRepository.findByEmail.mockResolvedValue(null);

    userRepository.create.mockResolvedValue({
      name: 'John Do',
      email: 'john@example.com',
    });

    const authService = new AuthService(userRepository);

    const user = await authService.register({
      name: 'John Do',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(user).toEqual({
      name: 'John Do',
      email: 'john@example.com',
    });

    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Do',
        email: 'john@example.com',
        password: expect.any(String),
      }),
    );
  });

  it('should reject user registration when email address is already registered', async () => {
    const userRepository = createMockUserRepository();

    userRepository.findByEmail.mockResolvedValue({
      name: 'John Do',
      email: 'john@example.com',
    });

    const authService = new AuthService(userRepository);

    await expect(
      authService.register({
        name: 'Another User',
        email: 'john@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow('User already exists');

    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      'john@example.com',
    );

    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should hash the password before creating a new user account', async () => {
    const userRepository = createMockUserRepository();

    userRepository.findByEmail.mockResolvedValue(null);

    userRepository.create.mockResolvedValue({
      name: 'John Do',
      email: 'john@example.com',
    });

    const authService = new AuthService(userRepository);

    await authService.register({
      name: 'John Do',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        password: expect.not.stringContaining('password123'),
      }),
    );
  });

  it('should reject registration when required registration details are missing', async () => {
    const userRepository = createMockUserRepository();

    const authService = new AuthService(userRepository);

    await expect(
      authService.register({
        name: '',
        email: '',
        password: '',
      }),
    ).rejects.toThrow('User registration details are required');

    expect(userRepository.findByEmail).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should reject registration when email format is invalid', async () => {
    const userRepository = createMockUserRepository();

    const authService = new AuthService(userRepository);

    await expect(
      authService.register({
        name: 'John Do',
        email: 'invalid-email',
        password: 'password123',
      }),
    ).rejects.toThrow('Invalid email address');

    expect(userRepository.findByEmail).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});