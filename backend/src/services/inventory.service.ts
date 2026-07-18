import type { VehicleInventory } from '../types/inventory.types.js';

export class InventoryService {
  constructor(private readonly vehicleRepository: any) {}

  async purchase(vehicleId: string): Promise<VehicleInventory> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    if (vehicle.quantity === 0) {
      throw new Error('Vehicle is out of stock');
    }

    return this.vehicleRepository.purchase(vehicleId);
  }

  async restock(
    vehicleId: string,
    quantity: number,
  ): Promise<VehicleInventory> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    if (quantity <= 0) {
      throw new Error('Invalid restock quantity');
    }

    return this.vehicleRepository.restock(vehicleId, quantity);
  }
}
