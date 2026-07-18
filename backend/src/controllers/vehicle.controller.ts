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

  async search(req: Request, res: Response): Promise<Response> {
    const { make, model, category, minPrice, maxPrice } = req.query;

    const filteredVehicles = vehicles.filter((vehicle) => {
      if (make && vehicle.make !== make) {
        return false;
      }

      if (model && vehicle.model !== model) {
        return false;
      }

      if (category && vehicle.category !== category) {
        return false;
      }

      if (minPrice && vehicle.price < Number(minPrice)) {
        return false;
      }

      if (maxPrice && vehicle.price > Number(maxPrice)) {
        return false;
      }

      return true;
    });

    return res.status(200).json(filteredVehicles);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);

    if (vehicleIndex === -1) {
      return res.status(404).json({
        message: 'Vehicle not found',
      });
    }

    if (req.body.price !== undefined && req.body.price <= 0) {
      return res.status(400).json({
        message: 'Invalid vehicle price',
      });
    }

    if (req.body.quantity !== undefined && req.body.quantity <= 0) {
      return res.status(400).json({
        message: 'Invalid vehicle quantity',
      });
    }

    vehicles[vehicleIndex] = {
      ...vehicles[vehicleIndex],
      ...req.body,
    };

    return res.status(200).json(vehicles[vehicleIndex]);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);

    if (vehicleIndex === -1) {
      return res.status(404).json({
        message: 'Vehicle not found',
      });
    }

    vehicles.splice(vehicleIndex, 1);

    return res.status(204).send();
  }

  async purchase(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);

    if (vehicleIndex === -1) {
      return res.status(404).json({
        message: 'Vehicle not found',
      });
    }

    vehicles[vehicleIndex] = {
      ...vehicles[vehicleIndex],
      quantity: vehicles[vehicleIndex].quantity - 1,
    };

    return res.status(200).json(vehicles[vehicleIndex]);
  }

  async restock(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const quantity = Number(req.body.quantity);

    if (!quantity) {
      return res.status(400).json({
        message: 'Quantity is required',
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        message: 'Invalid restock quantity',
      });
    }

    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);

    if (vehicleIndex === -1) {
      return res.status(404).json({
        message: 'Vehicle not found',
      });
    }

    vehicles[vehicleIndex] = {
      ...vehicles[vehicleIndex],
      quantity: vehicles[vehicleIndex].quantity + quantity,
    };

    return res.status(200).json(vehicles[vehicleIndex]);
  }
}
