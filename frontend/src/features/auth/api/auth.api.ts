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

    // Temporary implementation to satisfy
    // the first TDD contract.
    //
    // Real API integration will be added
    // after introducing the HTTP client layer.

    return {
        success: true,
    };
}