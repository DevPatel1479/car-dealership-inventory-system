import { randomUUID } from 'node:crypto';
import { ValidationError } from '../errors/validation.error.js';

import type {
  CreateVehiclePayload,
  VehicleResponse,
  VehicleSearchFilters,
} from '../types/vehicle.types.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class VehicleService {
  constructor(private readonly vehicleRepository: any) {}

  async create(vehicleData: CreateVehiclePayload): Promise<VehicleResponse> {
    if (!vehicleData.make || !vehicleData.model || !vehicleData.category) {
  throw new ValidationError('Vehicle details are required');
}

if (vehicleData.price <= 0 || vehicleData.quantity <= 0) {
  throw new ValidationError('Invalid vehicle price or quantity');
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
      throw new ValidationError('Vehicle id is required');
    }

    if (updateData.price !== undefined && updateData.price <= 0) {
      throw new ValidationError('Invalid vehicle price');
    }

    if (updateData.quantity !== undefined && updateData.quantity <= 0) {
      throw new ValidationError('Invalid vehicle quantity');
    }

    return this.vehicleRepository.update(id, updateData);
  }

  async getAll(): Promise<VehicleResponse[]> {
    return this.vehicleRepository.findAll();
  }

  async search(filters: VehicleSearchFilters): Promise<VehicleResponse[]> {
    return this.vehicleRepository.search(filters);
  }

  async delete(id: string): Promise<void> {
    return this.vehicleRepository.delete(id);
  }

  async purchase(id: string): Promise<VehicleResponse> {
    if (!id) {
      throw new ValidationError('Vehicle id is required');
    }

    const vehicle = await this.vehicleRepository.findById(id);



    if (!vehicle) {
      throw new NotFoundError('Vehicle not found');
    }

    if (vehicle.quantity <= 0) {
      throw new ValidationError('Vehicle is out of stock');
    }

    return this.vehicleRepository.purchase(id);
  }

  async restock(id: string, quantity: number): Promise<VehicleResponse> {
  if (!id) {
    throw new ValidationError('Vehicle id is required');
  }

  if (quantity <= 0) {
    throw new ValidationError('Invalid restock quantity');
  }

  return this.vehicleRepository.restock(id, quantity);
}
}
