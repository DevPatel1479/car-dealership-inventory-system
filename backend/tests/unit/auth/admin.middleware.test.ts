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

  it('should reject request when user is not admin', () => {
    const req: any = {
      user: {
        id: 'user-1',
        role: 'USER',
      },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),

      json: jest.fn(),
    };

    const next = jest.fn();

    adminMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Admin access required',
    });

    expect(next).not.toHaveBeenCalled();
  });
});
