import { VehicleModel } from '../models/vehicle.model.js';

import type { VehicleResponse } from '../types/vehicle.types.js';

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
}
