import { describe, expect, it, vi } from 'vitest';
import type { InternalAxiosRequestConfig } from 'axios';

import { authClient } from '../../../../src/lib/http';

import * as authStorage from '../../../../src/features/auth/services/auth.storage';

describe('Auth HTTP Client', () => {
  it('should attach jwt token to authenticated api requests', async () => {
    vi.spyOn(authStorage, 'getToken').mockReturnValue('jwt-token');

    const request = {
      headers: {},
    } as InternalAxiosRequestConfig;

    const interceptor = authClient.interceptors.request.handlers?.[0];

    await interceptor?.fulfilled(request);

    expect(request.headers.Authorization).toBe('Bearer jwt-token');
  });
});
