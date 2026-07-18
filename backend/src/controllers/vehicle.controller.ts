import type { Request, Response } from 'express';

import { vehicleSchema } from '../validators/vehicle.validator.js';

export const vehicles: any[] = [];

export class VehicleController {
  async create(req: Request, res: Response): Promise<Response> {
    const validationResult = vehicleSchema.safeParse(req.body);

    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues.at(0);

      return res.status(400).json({
        message: firstIssue?.message ?? 'Invalid vehicle details',
      });
    }

    const vehicle = {
      id: crypto.randomUUID(),
      make: validationResult.data.make,
      model: validationResult.data.model,
      category: validationResult.data.category,
      price: validationResult.data.price,
      quantity: validationResult.data.quantity,
    };

    vehicles.push(vehicle);

    return res.status(201).json(vehicle);
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    return res.status(200).json(vehicles);
  }
}
