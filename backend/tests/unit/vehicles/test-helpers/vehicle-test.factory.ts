import { jest } from '@jest/globals';

import type {
  VehicleResponse,
  VehicleSearchFilters,
} from '../../../../src/types/vehicle.types.js';

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

export function createMockVehicleRepository(vehicles: VehicleResponse[] = []) {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    search: jest.fn().mockResolvedValue(vehicles),
  };
}

export function expectVehicleSearch(
  repository: ReturnType<typeof createMockVehicleRepository>,
  filters: VehicleSearchFilters,
) {
  expect(repository.search).toHaveBeenCalledWith(filters);
}
