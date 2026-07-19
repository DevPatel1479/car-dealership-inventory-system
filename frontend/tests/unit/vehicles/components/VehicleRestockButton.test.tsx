import {
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import {
    fireEvent,
    render,
    screen,
} from '@testing-library/react';

import VehicleRestockButton from '../../../../src/features/vehicles/components/VehicleRestockButton';

import * as inventoryApi from '../../../../src/features/inventory/api/inventory.api';



describe('VehicleRestockButton Component', () => {

    it('should restock a vehicle when admin clicks restock button', async () => {

        const restockSpy =
            vi.spyOn(
                inventoryApi,
                'restockVehicle',
            )
                .mockResolvedValue({
                    id: '1',
                    quantity: 10,
                });



        render(
            <VehicleRestockButton
                vehicleId="1"
            />,
        );



        fireEvent.click(
            screen.getByRole(
                'button',
                {
                    name: 'Restock',
                },
            ),
        );



        expect(
            restockSpy,
        )
            .toHaveBeenCalledWith(
                '1',
            );

    });

});