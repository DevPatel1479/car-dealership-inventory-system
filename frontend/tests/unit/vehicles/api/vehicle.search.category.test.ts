import { describe, expect, it, vi } from 'vitest';

import { authClient } from '../../../../src/features/auth/api/http';

import {
    searchVehiclesByCategory,
} from '../../../../src/features/vehicles/api/vehicle.search.api';



describe('Vehicle Search API - Category', () => {


    it('should search vehicles by category', async () => {

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



        const response =
            await searchVehiclesByCategory(
                'Sedan',
            );



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
                '/api/vehicles/search?category=Sedan',
            );

    });


});