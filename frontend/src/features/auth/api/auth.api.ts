import { authClient } from '../../../lib/http';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  name: string;
  email: string;
  role: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    email: string;
    role: string;
  };
  token: string;
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  const response = await authClient.post('/api/auth/register', payload);

  return {
    name: response.data.name,
    email: response.data.email,
    role: response.data.role,
  };
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const response = await authClient.post('/api/auth/login', payload);

  return {
    user: {
      email: response.data.email,
      role: response.data.role,
    },
    token: response.data.token,
  };
}
