import type { Request, Response } from 'express';

export class AuthController {
  constructor(
    private readonly authService: any,
  ) {}


  async register(
    req: Request,
    res: Response,
  ): Promise<Response> {

    const user = await this.authService.register(
      req.body,
    );


    return res.json(user);
  }
}