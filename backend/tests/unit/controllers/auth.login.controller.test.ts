import { describe, expect, it, jest } from '@jest/globals';

import { AuthController } from '../../../src/controllers/auth.controller.js';
import type { AuthService } from '../../../src/services/auth.service.js';

describe('AuthController - Login', () => {
  it('should login user and return authenticated user with token', async () => {
    const authService = {
      login: jest.fn<AuthService['login']>(),
    };

    authService.login.mockResolvedValue({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      token: 'jwt-token',
    });

    const controller = new AuthController(authService as any);

    const req: any = {
      body: {
        email: 'john@example.com',
        password: 'password123',
      },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.login(req, res);

    expect(authService.login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(res.json).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      token: 'jwt-token',
    });
  });

  it('should return error when login fails', async () => {
    const authService = {
      login: jest.fn<AuthService['login']>(),
    };

    authService.login.mockRejectedValue(new Error('Invalid credentials'));

    const controller = new AuthController(authService as any);

    const req: any = {
      body: {
        email: 'john@example.com',
        password: 'wrong-password',
      },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid credentials',
    });
  });
});
