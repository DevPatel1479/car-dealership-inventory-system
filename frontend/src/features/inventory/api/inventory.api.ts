import { authClient } from '../../auth/api/http';


export interface PurchaseResponse {
    id: string;
    quantity: number;
}


export async function purchaseVehicle(
    id: string,
): Promise<PurchaseResponse> {

    const response =
        await authClient.post<PurchaseResponse>(
            `/api/vehicles/${id}/purchase`,
        );


    return response.data;

}