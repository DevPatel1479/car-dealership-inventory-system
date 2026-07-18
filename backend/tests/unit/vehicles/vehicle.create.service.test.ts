import { describe, expect, it } from '@jest/globals';

import { VehicleService } from '../../../src/services/vehicle.service.js';

describe('VehicleService - Create Vehicle', () => {
  it('should create a new vehicle with valid vehicle details', async () => {
    const vehicleRepository = {
      create: async () => ({
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      }),
    };

    const vehicleService = new VehicleService(vehicleRepository as any);

    const result = await vehicleService.create({
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });

    expect(result).toEqual({
      id: 'vehicle-1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });
  });

  it('should reject vehicle creation when required details are missing', async () => {
    const vehicleRepository = {
      create: async () => ({
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      }),
    };

    const vehicleService = new VehicleService(vehicleRepository as any);

    await expect(
      vehicleService.create({
        make: '',
        model: '',
        category: '',
        price: 0,
        quantity: 0,
      }),
    ).rejects.toThrow('Vehicle details are required');
  });
});
