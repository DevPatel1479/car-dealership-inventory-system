import type {
  CreateVehiclePayload,
  VehicleResponse,
} from '../types/vehicle.types.js';

export class VehicleService {
  constructor(private readonly vehicleRepository: any) {}

  async create(vehicleData: CreateVehiclePayload): Promise<VehicleResponse> {
    if (
      !vehicleData.make ||
      !vehicleData.model ||
      !vehicleData.category ||
      vehicleData.price <= 0 ||
      vehicleData.quantity <= 0
    ) {
      throw new Error('Vehicle details are required');
    }

    return this.vehicleRepository.create(vehicleData);
  }
}
