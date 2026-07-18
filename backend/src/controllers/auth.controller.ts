import type { Request, Response } from 'express';

export class AuthController {
  constructor(private readonly authService: any) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.authService.register(req.body);

      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.authService.login(req.body);

      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
