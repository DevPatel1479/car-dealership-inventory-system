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



describe('VehicleList Component', () => {


    it('should display available vehicles', async () => {


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



        render(
            <VehicleList />,
        );



        expect(
            await screen.findByText(
                'Toyota Camry',
            ),
        )
            .toBeInTheDocument();



        expect(
            screen.getByText(
                '$25000',
            ),
        )
            .toBeInTheDocument();


    });


});