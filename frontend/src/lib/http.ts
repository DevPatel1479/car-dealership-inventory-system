import axios from 'axios';

import { getToken, removeAuth } from '../features/auth/services/auth.storage';

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

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAuth();

      window.location.href = '/login';
    }

    const message = error.response?.data?.message ?? 'Something went wrong.';

    return Promise.reject(new Error(message));
  },
);
