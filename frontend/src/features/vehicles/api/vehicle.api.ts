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


export interface UpdateVehiclePayload {
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
}

export interface VehicleSearchFilters {
    make?: string;
    model?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}




export interface DeleteVehicleResponse {
    success: boolean;
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



export async function updateVehicle(
    id: string,
    payload: UpdateVehiclePayload,
): Promise<Vehicle> {

    const response = await authClient.put<Vehicle>(
        `/api/vehicles/${id}`,
        payload,
    );

    return response.data;
}

export async function deleteVehicle(
    id: string,
): Promise<DeleteVehicleResponse> {

    const response = await authClient.delete<DeleteVehicleResponse>(
        `/api/vehicles/${id}`,
    );

    return response.data;
}


export async function searchVehicles(
    filters: VehicleSearchFilters,
): Promise<Vehicle[]> {


    const response =
        await authClient.get<Vehicle[]>(
            '/api/vehicles/search',
            {
                params: filters,
            },
        );


    return response.data;

}