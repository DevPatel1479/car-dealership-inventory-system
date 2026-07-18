import type { Request, Response } from 'express';

import { vehicleSchema } from '../validators/vehicle.validator.js';

export class VehicleController {
  async create(req: Request, res: Response): Promise<Response> {
    const validationResult = vehicleSchema.safeParse(req.body);

    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues.at(0);

      return res.status(400).json({
        message: firstIssue?.message ?? 'Invalid vehicle details',
      });
    }

    return res.status(201).json({
      message: 'Vehicle created',
    });
  }
}