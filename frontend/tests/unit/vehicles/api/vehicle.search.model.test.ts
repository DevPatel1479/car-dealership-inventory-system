import { describe, expect, it, vi } from 'vitest';

import { authClient } from '../../../../src/lib/http';

import { searchVehiclesByModel } from '../../../../src/features/vehicles/api/vehicle.search.api';

describe('Vehicle Search API - Model', () => {
  it('should search vehicles by model', async () => {
    vi.spyOn(authClient, 'get').mockResolvedValue({
      data: [
        {
          id: '1',
          make: 'Toyota',
          model: 'Camry',
          category: 'Sedan',
          price: 25000,
          quantity: 5,
        },
      ],
    });

    const response = await searchVehiclesByModel('Camry');

    expect(response).toEqual([
      {
        id: '1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      },
    ]);

    expect(authClient.get).toHaveBeenCalledWith('/api/vehicles/search?model=Camry');
  });
});
