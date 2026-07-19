import { describe, expect, it } from 'vitest';

import {
    saveToken,
    getToken,
} from '../../../../src/features/auth/services/auth.storage';


describe('Auth Storage', () => {

    it('should store authentication token after successful login', () => {

        saveToken('jwt-token');


        expect(
            getToken(),
        ).toBe('jwt-token');

    });

});