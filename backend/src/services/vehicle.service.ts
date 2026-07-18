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

  async update(
    id: string,
    updateData: Partial<CreateVehiclePayload>,
  ): Promise<VehicleResponse> {
    if (!id) {
      throw new Error('Vehicle id is required');
    }

    if (updateData.price !== undefined && updateData.price <= 0) {
      throw new Error('Invalid vehicle price');
    }

    if (updateData.quantity !== undefined && updateData.quantity <= 0) {
      throw new Error('Invalid vehicle quantity');
    }

    return this.vehicleRepository.update(id, updateData);
  }
}
