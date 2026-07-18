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

  it('should reject vehicle creation when price or quantity is invalid', async () => {
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
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: -100,
        quantity: -1,
      }),
    ).rejects.toThrow('Invalid vehicle price or quantity');
  });

  it('should generate a unique id when creating a vehicle', async () => {
    const vehicleRepository = {
      create: jest.fn().mockResolvedValue({
        id: 'vehicle-123',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      }),
    };

    const vehicleService = new VehicleService(vehicleRepository);

    await vehicleService.create({
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });

    expect(vehicleRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      }),
    );
  });
});
