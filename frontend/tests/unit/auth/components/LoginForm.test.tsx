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
});