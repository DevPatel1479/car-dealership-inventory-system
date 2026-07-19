import axios from 'axios';

import {
    getToken,
} from '../services/auth.storage';


export const authClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


authClient.interceptors.request.use(
    (config) => {

        const token = getToken();

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
);