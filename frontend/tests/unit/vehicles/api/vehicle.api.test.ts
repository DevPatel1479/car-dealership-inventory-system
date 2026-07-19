import { describe, expect, it, vi } from 'vitest';

import { authClient } from '../../../../src/features/auth/api/http';

import {
    createVehicle,
    getVehicles,
    updateVehicle,
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


    it('should create a new vehicle', async () => {

        const vehicle = {
            make: 'Toyota',
            model: 'Camry',
            category: 'Sedan',
            price: 25000,
            quantity: 5,
        };


        vi.spyOn(
            authClient,
            'post',
        )
            .mockResolvedValue({
                data: {
                    id: '1',
                    ...vehicle,
                },
            });


        const response = await createVehicle(
            vehicle,
        );


        expect(response).toEqual({
            id: '1',
            make: 'Toyota',
            model: 'Camry',
            category: 'Sedan',
            price: 25000,
            quantity: 5,
        });


    });


    it('should update an existing vehicle', async () => {

        const vehicleId = '1';

        const payload = {
            make: 'Toyota',
            model: 'Camry',
            category: 'Sedan',
            price: 27000,
            quantity: 8,
        };


        const updatedVehicle = {
            id: vehicleId,
            ...payload,
        };


        vi.spyOn(
            authClient,
            'put',
        )
            .mockResolvedValue({
                data: updatedVehicle,
            });


        const response = await updateVehicle(
            vehicleId,
            payload,
        );


        expect(response)
            .toEqual(updatedVehicle);


        expect(
            authClient.put,
        )
            .toHaveBeenCalledWith(
                `/api/vehicles/${vehicleId}`,
                payload,
            );

    });

});