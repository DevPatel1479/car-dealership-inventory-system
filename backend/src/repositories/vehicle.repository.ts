import { VehicleModel } from '../models/vehicle.model.js';

import type {
  VehicleResponse,
  VehicleSearchFilters,
} from '../types/vehicle.types.js';

export class VehicleRepository {
  async create(vehicleData: VehicleResponse): Promise<VehicleResponse> {
    const vehicle = await VehicleModel.create(vehicleData);

    return {
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    };
  }
  async findAll(): Promise<VehicleResponse[]> {
    const vehicles = await VehicleModel.find().lean();

    return vehicles.map((vehicle) => ({
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    }));
  }

  async search(filters: VehicleSearchFilters): Promise<VehicleResponse[]> {
    const query: any = {};

    if (filters.make) {
      query.make = filters.make;
    }

    if (filters.model) {
      query.model = filters.model;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};

      if (filters.minPrice !== undefined) {
        query.price.$gte = filters.minPrice;
      }

      if (filters.maxPrice !== undefined) {
        query.price.$lte = filters.maxPrice;
      }
    }

    const vehicles = await VehicleModel.find(query).lean();

    return vehicles.map((vehicle) => ({
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    }));
  }
}
