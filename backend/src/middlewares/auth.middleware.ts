export class AuthMiddleware {
  handle(
    req: any,
    res: any,
    next: () => void,
  ): void {
    
    const authorizationHeader =
      req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error('Authentication token required');
    }

    next();
  }
}