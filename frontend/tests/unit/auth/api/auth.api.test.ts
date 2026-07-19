import { describe, expect, it, vi } from 'vitest';

import { registerUser } from '../../../../src/features/auth/api/auth.api';

describe('Auth API', () => {
    it('should register a new user', async () => {
        const user = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        const response = await registerUser(user);

        expect(response).toEqual({
            name: 'John Doe',
            email: 'john@example.com',
            role: 'USER',
        });
    });


    it('should login an existing user and return jwt token', async () => {
        const credentials = {
            email: 'john@example.com',
            password: 'password123',
        };

        const response = await loginUser(credentials);

        expect(response).toEqual({
            user: {
                email: 'john@example.com',
                role: 'USER',
            },
            token: 'jwt-token',
        });
    });

});