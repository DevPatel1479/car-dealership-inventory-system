import { describe, expect, it, vi } from 'vitest';

import { authClient } from '../../../../src/features/auth/api/http';

import {
    getVehicles,
} from '../../../../src/features/vehicles/api/vehicle.api';


describe('Vehicle API', () => {

    it('should fetch available vehicles', async () => {

        vi.spyOn(
            authClient,
            'get',
        )
            .mockResolvedValue({
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


        const response = await getVehicles();


        expect(response)
            .toEqual([
                {
                    id: '1',
                    make: 'Toyota',
                    model: 'Camry',
                    category: 'Sedan',
                    price: 25000,
                    quantity: 5,
                },
            ]);


        expect(
            authClient.get,
        )
            .toHaveBeenCalledWith(
                '/api/vehicles',
            );

    });

});