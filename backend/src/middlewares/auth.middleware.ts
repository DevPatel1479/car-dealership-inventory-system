import { JwtService } from '../services/jwt.service.js';

export class AuthMiddleware {
  constructor(private readonly jwtService = new JwtService()) {}

  handle(req: any, res: any, next: () => void): void {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
       res.status(401).json({
        message: 'Authentication required',
      });
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new Error('Invalid authentication token');
    }

    try {
      const userPayload = this.jwtService.verifyToken(token);

      req.user = userPayload;

      next();
    } catch {
      throw new Error('Invalid authentication token');
    }
  }
}
