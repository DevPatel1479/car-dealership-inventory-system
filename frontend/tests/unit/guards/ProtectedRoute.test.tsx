import { describe, expect, it, vi } from 'vitest';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import ProtectedRoute from '../../../src/guards/ProtectedRoute';

import * as authStorage from '../../../src/features/auth/services/auth.storage';

describe('ProtectedRoute', () => {
  it('should render protected content when user is authenticated', () => {
    vi.spyOn(authStorage, 'getToken').mockReturnValue('jwt-token');

    render(
      <MemoryRouter initialEntries={['/vehicles']}>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/vehicles" element={<h1>Vehicle Dashboard</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Vehicle Dashboard')).toBeInTheDocument();
  });

  it('should redirect unauthenticated users to login page', () => {
    vi.spyOn(authStorage, 'getToken').mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={['/vehicles']}>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/vehicles" element={<h1>Vehicle Dashboard</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
