import { describe, expect, it, jest } from '@jest/globals';

import { InventoryService } from '../../../src/services/inventory.service.js';

describe('InventoryService - Restock Vehicle', () => {
  it('should increase vehicle quantity when restock is successful', async () => {
    const vehicleRepository = {
      restock: jest.fn().mockResolvedValue({
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 10,
      }),
    };

    const inventoryService = new InventoryService(vehicleRepository as any);

    const result = await inventoryService.restock('vehicle-1', 5);

    expect(vehicleRepository.restock).toHaveBeenCalledWith('vehicle-1', 5);

    expect(result).toEqual({
      id: 'vehicle-1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 10,
    });
  });

  it('should reject restock when vehicle does not exist', async () => {
    const vehicleRepository = {
      findById: jest.fn().mockResolvedValue(null),
      restock: jest.fn(),
    };

    const inventoryService = new InventoryService(vehicleRepository as any);

    await expect(inventoryService.restock('vehicle-999', 5)).rejects.toThrow(
      'Vehicle not found',
    );

    expect(vehicleRepository.restock).not.toHaveBeenCalled();
  });
});
