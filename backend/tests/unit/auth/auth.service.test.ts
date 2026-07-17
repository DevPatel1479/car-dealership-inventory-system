import { describe, it, expect, jest } from '@jest/globals';
import { AuthService } from '../../../src/services/auth.service';

describe('AuthService - User Registration', () => {
  it('should create a new user account when valid registration details are provided', async () => {
    const userRepository = {
      create: jest.fn().mockResolvedValue({
        name: 'John Do',
        email: 'john@example.com',
      }),
    };

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

    expect(userRepository.create).toHaveBeenCalledWith({
      name: 'John Do',
      email: 'john@example.com',
      password: 'password123',
    });
  });

  it('should reject user registration when email address is already registered', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 'user-id-1',
        name: 'John Do',
        email: 'john@example.com',
      }),

      create: jest.fn(),
    };
    
    const authService = new AuthService(userRepository);

    await expect(
      authService.register({
        name: 'Another User',
        email: 'john@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow('User already exists');

    expect(userRepository.findByEmail).toHaveBeenCalledWith('john@example.com');

    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
