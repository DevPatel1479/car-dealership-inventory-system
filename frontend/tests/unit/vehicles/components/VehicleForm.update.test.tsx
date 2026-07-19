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


import VehicleForm from '../../../../src/features/vehicles/components/VehicleForm';


import * as vehicleApi from '../../../../src/features/vehicles/api/vehicle.api';



describe('VehicleForm Update', () => {


    it('should update an existing vehicle when edit mode is enabled', async () => {


        const updateSpy =
            vi.spyOn(
                vehicleApi,
                'updateVehicle',
            )
                .mockResolvedValue({
                    id: '1',
                    make: 'Toyota',
                    model: 'Camry',
                    category: 'Sedan',
                    price: 27000,
                    quantity: 8,
                });



        render(
            <VehicleForm
                vehicle={{
                    id: '1',
                    make: 'Toyota',
                    model: 'Camry',
                    category: 'Sedan',
                    price: 25000,
                    quantity: 5,
                }}
            />,
        );



        fireEvent.change(
            screen.getByLabelText('Price'),
            {
                target: {
                    value: '27000',
                },
            },
        );


        fireEvent.change(
            screen.getByLabelText('Quantity'),
            {
                target: {
                    value: '8',
                },
            },
        );



        fireEvent.click(
            screen.getByRole(
                'button',
                {
                    name: 'Update Vehicle',
                },
            ),
        );



        expect(
            updateSpy,
        )
            .toHaveBeenCalledWith(
                '1',
                {
                    make: 'Toyota',
                    model: 'Camry',
                    category: 'Sedan',
                    price: 27000,
                    quantity: 8,
                },
            );


    });


});