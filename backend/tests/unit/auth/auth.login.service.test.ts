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


    const authService = new AuthService(userRepository);


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

});