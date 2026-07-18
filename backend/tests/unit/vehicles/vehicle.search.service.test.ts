import { describe, expect, it, jest } from '@jest/globals';

import { VehicleService } from '../../../src/services/vehicle.service.js';

describe('VehicleService - Search Vehicles', () => {
  it('should search vehicles by make', async () => {
    const vehicleRepository = {
      search: jest.fn().mockResolvedValue([
        {
          id: 'vehicle-1',
          make: 'Toyota',
          model: 'Camry',
          category: 'Sedan',
          price: 25000,
          quantity: 5,
        },
      ]),
    };

    const vehicleService = new VehicleService(vehicleRepository);

    const result = await vehicleService.search({
      make: 'Toyota',
    });

    expect(vehicleRepository.search).toHaveBeenCalledWith({
      make: 'Toyota',
    });

    expect(result).toEqual([
      {
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      },
    ]);
  });

  it('should search vehicles by model', async () => {
    const vehicleRepository = {
      search: jest.fn().mockResolvedValue([
        {
          id: 'vehicle-2',
          make: 'Toyota',
          model: 'Corolla',
          category: 'Sedan',
          price: 22000,
          quantity: 8,
        },
      ]),
    };

    const vehicleService = new VehicleService(vehicleRepository as any);

    const result = await vehicleService.search({
      model: 'Corolla',
    });

    expect(vehicleRepository.search).toHaveBeenCalledWith({
      model: 'Corolla',
    });

    expect(result).toEqual([
      {
        id: 'vehicle-2',
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 22000,
        quantity: 8,
      },
    ]);
  });
});
