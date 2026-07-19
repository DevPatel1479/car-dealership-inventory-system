import { describe, expect, it } from 'vitest';

import {
    getVehicles,
} from '../../../../src/features/vehicles/api/vehicle.api';


describe('Vehicle API', () => {

    it('should fetch available vehicles', async () => {

        const response = await getVehicles();

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

    });

});