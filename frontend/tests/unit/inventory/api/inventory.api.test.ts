import { describe, expect, it, vi } from 'vitest';

import { authClient } from '../../../../src/features/auth/api/http';

import {
    purchaseVehicle,
} from '../../../../src/features/inventory/api/inventory.api';


describe('Inventory API', () => {

    it('should purchase a vehicle and decrease quantity', async () => {

        const vehicleId = '1';


        vi.spyOn(
            authClient,
            'post',
        )
            .mockResolvedValue({
                data: {
                    id: vehicleId,
                    quantity: 4,
                },
            });



        const response = await purchaseVehicle(
            vehicleId,
        );



        expect(response)
            .toEqual({
                id: vehicleId,
                quantity: 4,
            });



        expect(
            authClient.post,
        )
            .toHaveBeenCalledWith(
                `/api/vehicles/${vehicleId}/purchase`,
            );

    });

});