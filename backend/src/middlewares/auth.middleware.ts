import { JwtService } from '../services/jwt.service.js';

export class AuthMiddleware {
  constructor(
    private readonly jwtService = new JwtService(),
  ) {}

  handle(req: any, res: any, next: () => void): void {
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
      throw new Error('Invalid authentication token');
    }
  }
}