import type { Request, Response } from 'express';

import { vehicleSchema } from '../validators/vehicle.validator.js';

import { VehicleService } from '../services/vehicle.service.js';
import { VehicleRepository } from '../repositories/vehicle.repository.js';

export class VehicleController {
  constructor(
    private readonly vehicleService = new VehicleService(
      new VehicleRepository(),
    ),
  ) {}

  private getVehicleId(req: Request): string | null {
    const { id } = req.params;

    if (typeof id !== 'string' || id.length === 0) {
      return null;
    }

    return id;
  }

  async create(req: Request, res: Response): Promise<Response> {
    const validationResult = vehicleSchema.safeParse(req.body);

    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues.at(0);

      return res.status(400).json({
        message: firstIssue?.message ?? 'Invalid vehicle details',
      });
    }

    const vehicle = await this.vehicleService.create(validationResult.data);

    return res.status(201).json(vehicle);
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const vehicles = await this.vehicleService.getAll();

    return res.status(200).json(vehicles);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const filters = {
      ...(typeof req.query.make === 'string' && {
        make: req.query.make,
      }),

      ...(typeof req.query.model === 'string' && {
        model: req.query.model,
      }),

      ...(typeof req.query.category === 'string' && {
        category: req.query.category,
      }),

      ...(typeof req.query.minPrice === 'string' && {
        minPrice: Number(req.query.minPrice),
      }),

      ...(typeof req.query.maxPrice === 'string' && {
        maxPrice: Number(req.query.maxPrice),
      }),
    };

    const vehicles = await this.vehicleService.search(filters);

    return res.status(200).json(vehicles);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = this.getVehicleId(req);

    if (!id) {
      return res.status(400).json({
        message: 'Vehicle id is required',
      });
    }

    const vehicle = await this.vehicleService.update(id, req.body);

    return res.status(200).json(vehicle);
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.getVehicleId(req);

      if (!id) {
        return res.status(400).json({
          message: 'Vehicle id is required',
        });
      }

      await this.vehicleService.delete(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async purchase(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.getVehicleId(req);

      if (!id) {
        return res.status(400).json({
          message: 'Vehicle id is required',
        });
      }

      const vehicle = await this.vehicleService.purchase(id);

      return res.status(200).json(vehicle);
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async restock(req: Request, res: Response): Promise<Response> {
    try {
      const id = this.getVehicleId(req);

      if (!id) {
        return res.status(400).json({
          message: 'Vehicle id is required',
        });
      }

      const quantity = Number(req.body.quantity);

      if (!quantity) {
        return res.status(400).json({
          message: 'Quantity is required',
        });
      }

      const vehicle = await this.vehicleService.restock(id, quantity);

      return res.status(200).json(vehicle);
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}
