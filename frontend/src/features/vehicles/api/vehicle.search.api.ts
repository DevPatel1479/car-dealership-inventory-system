import { authClient } from '../../auth/api/http';

import type { Vehicle } from './vehicle.api';



export async function searchVehiclesByMake(
    make: string,
): Promise<Vehicle[]> {

    const response =
        await authClient.get<Vehicle[]>(
            `/api/vehicles/search?make=${make}`,
        );


    return response.data;

}