import { describe, expect, it, jest } from '@jest/globals';

import { VehicleService } from '../../../src/services/vehicle.service.js';

describe('VehicleService - Update Vehicle', () => {
  it('should update vehicle details when vehicle exists', async () => {
    const vehicleRepository = {
      update: jest.fn().mockResolvedValue({
        id: 'vehicle-123',
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 30000,
        quantity: 10,
      }),
    };

    const vehicleService = new VehicleService(vehicleRepository);

    const result = await vehicleService.update('vehicle-123', {
      price: 30000,
      quantity: 10,
    });

    expect(vehicleRepository.update).toHaveBeenCalledWith('vehicle-123', {
      price: 30000,
      quantity: 10,
    });

    expect(result).toEqual({
      id: 'vehicle-123',
      make: 'Toyota',
      model: 'Corolla',
      category: 'Sedan',
      price: 30000,
      quantity: 10,
    });
  });
});
