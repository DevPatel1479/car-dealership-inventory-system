import type { Request, Response, NextFunction } from 'express';


export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {

  next();

}