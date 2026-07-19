import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { LoginForm } from '../../../../src/features/auth/components/LoginForm';

describe('LoginForm', () => {
  it('should render the email input', () => {
    render(<LoginForm />);

    expect(
      screen.getByRole('textbox', {
        name: /email/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render the password input', () => {
    render(<LoginForm />);

    expect(
      screen.getByLabelText(/password/i),
    ).toBeInTheDocument();
  });

  it('should render the login button', () => {
    render(<LoginForm />);

    expect(
      screen.getByRole('button', {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });

});