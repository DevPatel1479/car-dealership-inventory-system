import { describe, expect, it, vi } from 'vitest';

import { authClient } from '../../../../src/features/auth/api/http';
import {
    loginUser,
    registerUser,
} from '../../../../src/features/auth/api/auth.api';


vi.mock(
    '../../../../src/features/auth/api/http',
    () => ({
        authClient: {
            post: vi.fn(),
        },
    }),
);


describe('Auth API', () => {

    it('should register a new user', async () => {

        vi.mocked(authClient.post)
            .mockResolvedValue({
                data: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'USER',
                },
            });


        const response = await registerUser({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        });


        expect(response).toEqual({
            name: 'John Doe',
            email: 'john@example.com',
            role: 'USER',
        });

    });



    it('should login an existing user and return jwt token', async () => {

        vi.mocked(authClient.post)
            .mockResolvedValue({
                data: {
                    email: 'john@example.com',
                    role: 'USER',
                    token: 'jwt-token',
                },
            });


        const response = await loginUser({
            email: 'john@example.com',
            password: 'password123',
        });


        expect(response).toEqual({
            user: {
                email: 'john@example.com',
                role: 'USER',
            },
            token: 'jwt-token',
        });


        expect(authClient.post)
            .toHaveBeenCalledWith(
                '/api/auth/login',
                {
                    email: 'john@example.com',
                    password: 'password123',
                },
            );

    });

});