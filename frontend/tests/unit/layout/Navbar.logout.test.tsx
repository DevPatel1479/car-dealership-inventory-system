import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Navbar from '../../../src/components/layout/Navbar';
import * as authStorage from '../../../src/features/auth/services/auth.storage';

vi.mock('../../../src/features/auth/services/auth.storage', () => ({
  removeToken: vi.fn(),
}));

describe('Navbar', () => {
  it('should logout the current user', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await user.click(
      screen.getByRole('button', {
        name: /logout/i,
      }),
    );

    expect(authStorage.removeAuth).toHaveBeenCalled();
  });
});
