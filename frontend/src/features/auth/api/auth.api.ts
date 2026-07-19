import { authClient } from './http';

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    success: boolean;
}

export async function registerUser(
    payload: RegisterPayload,
): Promise<RegisterResponse> {

    const response = await authClient.post(
        '/api/auth/register',
        payload,
    );

    return response.data;
}