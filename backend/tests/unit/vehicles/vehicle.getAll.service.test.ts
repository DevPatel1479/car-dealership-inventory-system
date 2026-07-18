import { describe, expect, it, jest } from '@jest/globals';

import { VehicleService } from '../../../src/services/vehicle.service.js';
import type { VehicleRepository } from '../../../src/repositories/vehicle.repository.js';

describe('VehicleService - Get All Vehicles', () => {
  it('should return all available vehicles', async () => {
    const vehicleRepository = {
      findAll: jest.fn<VehicleRepository['findAll']>(),
    };

    vehicleRepository.findAll.mockResolvedValue([
      {
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      },
      {
        id: 'vehicle-2',
        make: 'BMW',
        model: 'X5',
        category: 'SUV',
        price: 60000,
        quantity: 3,
      },
    ]);

    const vehicleService = new VehicleService(vehicleRepository);

    const result = await vehicleService.getAll();

    expect(vehicleRepository.findAll).toHaveBeenCalled();

    expect(result).toEqual([
      {
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      },
      {
        id: 'vehicle-2',
        make: 'BMW',
        model: 'X5',
        category: 'SUV',
        price: 60000,
        quantity: 3,
      },
    ]);
  });
});
