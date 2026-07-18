import { describe, expect, it, jest } from '@jest/globals';

import { adminMiddleware } from '../../../src/middlewares/admin.middleware.js';

describe('Admin Middleware', () => {
  it('should allow request when user has admin role', () => {
    const req: any = {
      user: {
        id: 'user-1',
        role: 'ADMIN',
      },
    };

    const res: any = {};

    const next = jest.fn();

    adminMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
