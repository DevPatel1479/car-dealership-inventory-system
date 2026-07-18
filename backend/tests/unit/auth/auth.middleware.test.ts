import { describe, expect, it } from '@jest/globals';

import { AuthMiddleware } from '../../../src/middlewares/auth.middleware.js';

describe('AuthMiddleware', () => {
  it('should reject request when authorization token is missing', async () => {
    const req = {
      headers: {},
    } as any;

    const res = {} as any;

    const next = () => {};

    const authMiddleware = new AuthMiddleware();

    expect(() => authMiddleware.handle(req, res, next)).toThrow(
      'Authentication token required',
    );
  });

  it('should reject request when JWT token is invalid', async () => {
    const req = {
      headers: {
        authorization: 'Bearer invalid-token',
      },
    } as any;

    const res = {} as any;

    const next = () => {};

    const authMiddleware = new AuthMiddleware();

    expect(() => authMiddleware.handle(req, res, next)).toThrow(
      'Invalid authentication token',
    );
  });
});
