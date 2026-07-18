import { randomUUID } from 'node:crypto';
import type {
  CreateVehiclePayload,
  VehicleResponse,
} from '../types/vehicle.types.js';

export class VehicleService {
  constructor(private readonly vehicleRepository: any) {}

  async create(vehicleData: CreateVehiclePayload): Promise<VehicleResponse> {
    if (!vehicleData.make || !vehicleData.model || !vehicleData.category) {
      throw new Error('Vehicle details are required');
    }

    if (vehicleData.price <= 0 || vehicleData.quantity <= 0) {
      throw new Error('Invalid vehicle price or quantity');
    }
    const vehicleWithId: VehicleResponse = {
      id: randomUUID(),
      ...vehicleData,
    };
    return this.vehicleRepository.create(vehicleWithId);
  }
}
