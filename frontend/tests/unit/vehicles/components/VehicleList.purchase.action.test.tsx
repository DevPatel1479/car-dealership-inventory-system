import {
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';


import VehicleList from '../../../../src/features/vehicles/components/VehicleList';


import * as vehicleApi from '../../../../src/features/vehicles/api/vehicle.api';

import * as inventoryApi from '../../../../src/features/inventory/api/inventory.api';



describe('Vehicle Purchase Action', () => {


    it('should purchase a vehicle when purchase button is clicked', async () => {


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
                    quantity: 5,
                },
            ]);



        const purchaseSpy =
            vi.spyOn(
                inventoryApi,
                'purchaseVehicle',
            )
                .mockResolvedValue({
                    id: '1',
                    quantity: 4,
                });



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



        fireEvent.click(
            purchaseButton,
        );



        expect(
            purchaseSpy,
        )
            .toHaveBeenCalledWith(
                '1',
            );


    });


});