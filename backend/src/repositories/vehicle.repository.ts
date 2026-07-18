import { VehicleModel } from '../models/vehicle.model.js';

import type {
  CreateVehiclePayload,
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

  async update(
    id: string,
    updateData: Partial<CreateVehiclePayload>,
  ): Promise<VehicleResponse> {
    const vehicle = await VehicleModel.findOneAndUpdate({ id }, updateData, {
      new: true,
    }).lean();

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    return {
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    };
  }

  async delete(id: string): Promise<void> {
    const vehicle = await VehicleModel.findOneAndDelete({
      id,
    });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
  }

  async findById(id: string): Promise<VehicleResponse | null> {
    const vehicle = await VehicleModel.findOne({
      id,
    }).lean();

    if (!vehicle) {
      return null;
    }

    return {
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    };
  }

  async purchase(id: string): Promise<VehicleResponse> {
    const vehicle = await VehicleModel.findOneAndUpdate(
      {
        id,
      },
      {
        $inc: {
          quantity: -1,
        },
      },
      {
        new: true,
      },
    ).lean();

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    return {
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    };
  }
}
