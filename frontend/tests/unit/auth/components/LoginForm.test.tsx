import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('should submit the entered credentials', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByRole('textbox', {
        name: /email/i,
      }),
      'john@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    await user.click(
      screen.getByRole('button', {
        name: /login/i,
      }),
    );

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
  });

  it('should show validation error when submitting empty credentials', async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn();

    render(
      <LoginForm onSubmit={onSubmit} />,
    );

    await user.click(
      screen.getByRole('button', {
        name: /login/i,
      }),
    );

    expect(
      screen.getByText(
        /email and password are required/i,
      ),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });


  it('should disable login button while submitting credentials', async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn(
      () => new Promise(() => { }),
    );

    render(
      <LoginForm onSubmit={onSubmit} />,
    );

    await user.type(
      screen.getByRole('textbox', {
        name: /email/i,
      }),
      'john@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    await user.click(
      screen.getByRole('button', {
        name: /login/i,
      }),
    );

    expect(
      screen.getByRole('button', {
        name: /logging in/i,
      }),
    ).toBeDisabled();
  });

});