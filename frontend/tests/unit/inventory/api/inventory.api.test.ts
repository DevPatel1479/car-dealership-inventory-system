import { describe, expect, it, vi } from 'vitest';

import { authClient } from '../../../../src/features/auth/api/http';

import {
    purchaseVehicle,
} from '../../../../src/features/inventory/api/inventory.api';

import * as authStorage from '../../../../src/features/auth/services/auth.storage';


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

    it('should restock a vehicle when admin user is authenticated', async () => {

        const vehicleId = '1';


        vi.spyOn(
            authStorage,
            'getToken',
        )
            .mockReturnValue(
                'admin-jwt-token',
            );



        vi.spyOn(
            authClient,
            'post',
        )
            .mockResolvedValue({
                data: {
                    id: vehicleId,
                    quantity: 10,
                },
            });



        const response = await restockVehicle(
            vehicleId,
        );



        expect(response)
            .toEqual({
                id: vehicleId,
                quantity: 10,
            });



        expect(
            authClient.post,
        )
            .toHaveBeenCalledWith(
                `/api/vehicles/${vehicleId}/restock`,
            );

    });

});