import type { NextFunction, Request, Response } from 'express';

import { vehicleSchema } from '../validators/vehicle.validator.js';

import { VehicleService } from '../services/vehicle.service.js';
import { VehicleRepository } from '../repositories/vehicle.repository.js';
import { ValidationError } from '../errors/validation.error.js';

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
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = this.getVehicleId(req);

      if (!id) {
        throw new ValidationError('Vehicle id is required');
      }

      await this.vehicleService.delete(id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async purchase(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = this.getVehicleId(req);

      if (!id) {
        throw new ValidationError('Vehicle id is required');
      }

      const vehicle = await this.vehicleService.purchase(id);

      res.status(200).json(vehicle);
    } catch (error) {
      next(error);
    }
  }

  async restock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = this.getVehicleId(req);

      if (!id) {
        throw new ValidationError('Vehicle id is required');
      }

      const { quantity } = req.body;

      if (quantity === undefined || quantity === null) {
        throw new ValidationError('Quantity is required');
      }

      const parsedQuantity = Number(quantity);

      if (Number.isNaN(parsedQuantity)) {
        throw new ValidationError('Quantity must be a number');
      }

      const vehicle = await this.vehicleService.restock(id, parsedQuantity);

      res.status(200).json(vehicle);
    } catch (error) {
      next(error);
    }
  }
}
