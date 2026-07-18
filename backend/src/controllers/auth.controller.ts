import type { Request, Response } from 'express';
import { loginSchema } from '../validators/login.validator.js';

export class AuthController {
  constructor(private readonly authService: any) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.authService.register(req.body);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    const firstIssue = validationResult.error.issues.at(0);

    res.status(400).json({
      message: firstIssue?.message ?? 'Invalid login details',
    });

    return;
  }

  try {
    const response = await this.authService.login(validationResult.data);

    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({
      message: (error as Error).message,
    });
  }
}
}
