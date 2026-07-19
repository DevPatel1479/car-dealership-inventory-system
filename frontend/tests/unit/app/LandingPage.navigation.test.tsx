import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import AppRouter from '../../../src/app/router';
import { AuthProvider } from '../../../src/features/auth/context/AuthContext';

describe('LandingPage Navigation', () => {
  it('should navigate to the login page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole('button', {
        name: /login/i,
      }),
    );

    expect(
      screen.getByRole('heading', {
        name: /welcome back/i,
      }),
    ).toBeInTheDocument();
  });
});