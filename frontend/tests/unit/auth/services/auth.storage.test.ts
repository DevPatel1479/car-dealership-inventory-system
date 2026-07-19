import { describe, expect, it } from 'vitest';

import { saveAuth, getToken } from '../../../../src/features/auth/services/auth.storage';

describe('Auth Storage', () => {
  it('should store authentication token after successful login', () => {
    saveAuth('jwt-token', {
      email: "d@gmail.com",
      role: "USER"
    });

    expect(getToken()).toBe('jwt-token');
  });
});
