import { JwtService } from '../services/jwt.service.js';

import type { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
  constructor(private readonly jwtService = new JwtService()) {}

  handle(req: Request, res: Response, next: NextFunction): void {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({
        message: 'Authentication required',
      });

      return;
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      res.status(401).json({
        message: 'Invalid authentication token',
      });

      return;
    }

    try {
      const userPayload = this.jwtService.verifyToken(token);

      req.user = userPayload;

      next();
    } catch {
      res.status(401).json({
        message: 'Invalid authentication token',
      });
    }
  }
}
