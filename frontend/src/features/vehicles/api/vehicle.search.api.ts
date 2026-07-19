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

export async function searchVehiclesByModel(
    model: string,
): Promise<Vehicle[]> {

    const response =
        await authClient.get<Vehicle[]>(
            `/api/vehicles/search?model=${model}`,
        );


    return response.data;

}

export async function searchVehiclesByCategory(
    category: string,
): Promise<Vehicle[]> {

    const response =
        await authClient.get<Vehicle[]>(
            `/api/vehicles/search?category=${category}`,
        );


    return response.data;

}

export async function searchVehiclesByPriceRange(
    minPrice: number,
    maxPrice: number,
): Promise<Vehicle[]> {

    const response =
        await authClient.get<Vehicle[]>(
            `/api/vehicles/search?minPrice=${minPrice}&maxPrice=${maxPrice}`,
        );


    return response.data;

}