import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import LandingPage from '../../../src/app/LandingPage';

describe('LandingPage', () => {
  it('should render the application title', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        name: /find and manage yourdream vehicle/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render a login button', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('button', {
        name: 'Login',
      }),
    ).toBeInTheDocument();
  });

  it('should render a register button', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('button', {
        name: 'Register',
      }),
    ).toBeInTheDocument();
  });
});