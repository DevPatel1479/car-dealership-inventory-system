import { jest } from '@jest/globals';

import type {
  VehicleResponse,
  VehicleSearchFilters,
} from '../../../../src/types/vehicle.types.js';
import type { VehicleRepository } from '../../../../src/repositories/vehicle.repository.js';

export function createMockVehicle(
  overrides: Partial<VehicleResponse> = {},
): VehicleResponse {
  return {
    id: 'vehicle-1',
    make: 'Toyota',
    model: 'Camry',
    category: 'Sedan',
    price: 25000,
    quantity: 5,
    ...overrides,
  };
}

export type MockVehicleRepository = {
  create: jest.MockedFunction<VehicleRepository['create']>;
  update: jest.MockedFunction<VehicleRepository['update']>;
  findAll: jest.MockedFunction<VehicleRepository['findAll']>;
  search: jest.MockedFunction<VehicleRepository['search']>;
  delete: jest.MockedFunction<VehicleRepository['delete']>;
  purchase: jest.MockedFunction<VehicleRepository['purchase']>;
  restock: jest.MockedFunction<VehicleRepository['restock']>;
};

export function createMockVehicleRepository(
  vehicles: VehicleResponse[] = [],
): MockVehicleRepository {
  return {
    create: jest.fn<VehicleRepository['create']>(),
    update: jest.fn<VehicleRepository['update']>(),
    findAll: jest
      .fn<VehicleRepository['findAll']>()
      .mockResolvedValue(vehicles),
    search: jest.fn<VehicleRepository['search']>().mockResolvedValue(vehicles),

    delete: jest.fn<VehicleRepository['delete']>(),
    purchase: jest.fn<VehicleRepository['purchase']>(),
    restock: jest.fn<VehicleRepository['restock']>(),
  };
}

export function expectVehicleSearch(
  repository: ReturnType<typeof createMockVehicleRepository>,
  filters: VehicleSearchFilters,
) {
  expect(repository.search).toHaveBeenCalledWith(filters);
}
