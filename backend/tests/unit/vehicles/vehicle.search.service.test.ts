import { describe, expect, it } from '@jest/globals';

import { VehicleService } from '../../../src/services/vehicle.service.js';

import {
  createMockVehicle,
  createMockVehicleRepository,
  expectVehicleSearch,
} from './test-helpers/vehicle-test.factory.js';

describe('VehicleService - Search Vehicles', () => {
  it('should search vehicles by make', async () => {
    const vehicles = [
      createMockVehicle({
        make: 'Toyota',
      }),
    ];

    const repository = createMockVehicleRepository(vehicles);

    const service = new VehicleService(repository);

    const result = await service.search({
      make: 'Toyota',
    });

    expectVehicleSearch(repository, {
      make: 'Toyota',
    });

    expect(result).toEqual(vehicles);
  });

  it('should search vehicles by model', async () => {
    const vehicles = [
      createMockVehicle({
        id: 'vehicle-2',
        model: 'Corolla',
        price: 22000,
        quantity: 8,
      }),
    ];

    const repository = createMockVehicleRepository(vehicles);

    const service = new VehicleService(repository);

    const result = await service.search({
      model: 'Corolla',
    });

    expectVehicleSearch(repository, {
      model: 'Corolla',
    });

    expect(result).toEqual(vehicles);
  });

  it('should search vehicles by category', async () => {
    const vehicles = [
      createMockVehicle({
        id: 'vehicle-3',
        make: 'Honda',
        model: 'City',
        category: 'Sedan',
        price: 18000,
        quantity: 10,
      }),
    ];

    const repository = createMockVehicleRepository(vehicles);

    const service = new VehicleService(repository);

    const result = await service.search({
      category: 'Sedan',
    });

    expectVehicleSearch(repository, {
      category: 'Sedan',
    });

    expect(result).toEqual(vehicles);
  });

  it('should search vehicles within a price range', async () => {
    const vehicles = [
      createMockVehicle({
        id: 'vehicle-4',
        make: 'Hyundai',
        model: 'Creta',
        category: 'SUV',
        price: 25000,
        quantity: 6,
      }),
    ];

    const repository = createMockVehicleRepository(vehicles);

    const service = new VehicleService(repository);

    const result = await service.search({
      minPrice: 20000,
      maxPrice: 30000,
    });

    expectVehicleSearch(repository, {
      minPrice: 20000,
      maxPrice: 30000,
    });

    expect(result).toEqual(vehicles);
  });
});
