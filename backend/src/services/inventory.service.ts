import type { VehicleResponse } from '../types/vehicle.types.js';

export class InventoryService {
  constructor(private readonly vehicleRepository: any) {}

  async purchase(vehicleId: string): Promise<VehicleResponse> {
    return this.vehicleRepository.purchase(vehicleId);
  }
}
