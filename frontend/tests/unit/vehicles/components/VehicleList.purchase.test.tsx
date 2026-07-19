import {
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import {
    render,
    screen,
} from '@testing-library/react';


import VehicleList from '../../../../src/features/vehicles/components/VehicleList';


import * as vehicleApi from '../../../../src/features/vehicles/api/vehicle.api';



describe('Vehicle Purchase Button', () => {


    it('should disable purchase button when vehicle quantity is zero', async () => {


        vi.spyOn(
            vehicleApi,
            'getVehicles',
        )
            .mockResolvedValue([
                {
                    id: '1',
                    make: 'Toyota',
                    model: 'Camry',
                    category: 'Sedan',
                    price: 25000,
                    quantity: 0,
                },
            ]);



        render(
            <VehicleList />,
        );



        const purchaseButton =
            await screen.findByRole(
                'button',
                {
                    name: 'Purchase',
                },
            );



        expect(
            purchaseButton,
        )
            .toBeDisabled();


    });


});