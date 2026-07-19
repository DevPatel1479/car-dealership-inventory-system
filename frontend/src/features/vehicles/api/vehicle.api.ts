import { authClient } from '../../auth/api/http';


export interface Vehicle {
    id: string;
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
}

export interface CreateVehiclePayload {
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
}


export async function getVehicles(): Promise<Vehicle[]> {

    const response = await authClient.get(
        '/api/vehicles',
    );

    return response.data;

}


export async function createVehicle(
    payload: CreateVehiclePayload,
): Promise<Vehicle> {

    const response = await authClient.post<Vehicle>(
        '/api/vehicles',
        payload,
    );

    return response.data;
}