import { JwtService } from '../services/jwt.service.js';

export class AuthMiddleware {
  constructor(private readonly jwtService = new JwtService()) {}

  handle(req: any, res: any, next: () => void): void {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error('Authentication token required');
    }

    const token = authorizationHeader.replace('Bearer ', '');

    try {
      this.jwtService.verifyToken(token);

      next();
    } catch {
      throw new Error('Invalid authentication token');
    }
  }
}
