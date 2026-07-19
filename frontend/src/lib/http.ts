import axios from 'axios';

import { getToken } from '../features/auth/services/auth.storage';

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

authClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
