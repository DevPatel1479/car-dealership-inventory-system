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
});