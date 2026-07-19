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


import VehicleSearch from '../../../../src/features/vehicles/components/VehicleSearch';


import * as vehicleApi from '../../../../src/features/vehicles/api/vehicle.api';



describe('VehicleSearch Component', () => {


    it('should search vehicles by make', async () => {


        const searchSpy =
            vi.spyOn(
                vehicleApi,
                'searchVehicles',
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



        render(
            <VehicleSearch />,
        );



        const input =
            screen.getByPlaceholderText(
                'Search by make',
            );



        fireEvent.change(
            input,
            {
                target: {
                    value: 'Toyota',
                },
            },
        );



        const button =
            screen.getByRole(
                'button',
                {
                    name: 'Search',
                },
            );



        fireEvent.click(
            button,
        );



        expect(
            searchSpy,
        )
            .toHaveBeenCalledWith({
                make: 'Toyota',
            });


    });


});