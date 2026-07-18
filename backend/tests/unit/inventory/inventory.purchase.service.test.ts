import { describe, expect, it, jest } from '@jest/globals';

import { InventoryService } from '../../../src/services/inventory.service.js';

describe('InventoryService - Purchase Vehicle', () => {
  it('should decrease vehicle quantity when purchase is successful', async () => {
    const vehicleRepository = {
      purchase: jest.fn().mockResolvedValue({
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 4,
      }),
    };

    const inventoryService = new InventoryService(vehicleRepository);

    const result = await inventoryService.purchase('vehicle-1');

    expect(vehicleRepository.purchase).toHaveBeenCalledWith('vehicle-1');

    expect(result).toEqual({
      id: 'vehicle-1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 4,
    });
  });

  it('should reject purchase when vehicle is out of stock', async () => {
    const vehicleRepository = {
      purchase: jest.fn(),
      findById: jest.fn().mockResolvedValue({
        id: 'vehicle-123',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 0,
      }),
    };

    const inventoryService = new InventoryService(vehicleRepository as any);

    await expect(inventoryService.purchase('vehicle-123')).rejects.toThrow(
      'Vehicle is out of stock',
    );

    expect(vehicleRepository.purchase).not.toHaveBeenCalled();
  });
});
