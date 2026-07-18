import { VehicleModel } from '../models/vehicle.model.js';

import { NotFoundError } from '../errors/not-found.error.js';

import type {
  CreateVehiclePayload,
  VehicleResponse,
  VehicleSearchFilters,
} from '../types/vehicle.types.js';
import { ValidationError } from '../errors/validation.error.js';

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
      throw new NotFoundError('Vehicle not found');
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
      throw new NotFoundError('Vehicle not found');
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
      quantity: { $gt: 0 },
    },
    {
      $inc: {
        quantity: -1,
      },
    },
    {
      returnDocument: 'after',
    },
  ).lean();

  if (vehicle) {
    return {
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    };
  }

  const existingVehicle = await VehicleModel.findOne({ id }).lean();

  if (!existingVehicle) {
    throw new NotFoundError('Vehicle not found');
  }

  throw new ValidationError('Vehicle is out of stock');
}

  
  async restock(id: string, quantity: number): Promise<VehicleResponse> {
    const vehicle = await VehicleModel.findOneAndUpdate(
      {
        id,
      },
      {
        $inc: {
          quantity,
        },
      },
      {
        new: true,
      },
    ).lean();

    if (!vehicle) {
      throw new NotFoundError('Vehicle not found');
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
