import { describe, expect, it, vi } from 'vitest';

import { authClient } from '../../../../src/features/auth/api/http';

import {
    searchVehiclesByPriceRange,
} from '../../../../src/features/vehicles/api/vehicle.search.api';



describe('Vehicle Search API - Price Range', () => {


    it('should search vehicles within price range', async () => {


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
            await searchVehiclesByPriceRange(
                20000,
                30000,
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
                '/api/vehicles/search?minPrice=20000&maxPrice=30000',
            );


    });


});