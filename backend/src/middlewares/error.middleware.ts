import type { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation.error.js';
import { NotFoundError } from '../errors/not-found.error.js';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
}
