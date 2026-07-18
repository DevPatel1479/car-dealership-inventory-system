import jwt from 'jsonwebtoken';

import type { AuthTokenPayload } from '../types/auth.types.js';

export class JwtService {
  generateToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET ?? 'development-secret', {
      expiresIn: '1h',
    });
  }

  verifyToken(token: string): AuthTokenPayload {
    return jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'development-secret',
    ) as AuthTokenPayload;
  }
}
