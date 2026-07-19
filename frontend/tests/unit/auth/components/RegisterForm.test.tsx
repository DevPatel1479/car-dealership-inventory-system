import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { RegisterForm } from '../../../../src/features/auth/components/RegisterForm';

describe('RegisterForm', () => {
    it('should render the name input', () => {
        render(<RegisterForm />);

        expect(
            screen.getByRole('textbox', {
                name: /name/i,
            }),
        ).toBeInTheDocument();
    });

    it('should render the email input', () => {
        render(<RegisterForm />);

        expect(
            screen.getByRole('textbox', {
                name: /email/i,
            }),
        ).toBeInTheDocument();
    });

    it('should render the password input', () => {
        render(<RegisterForm />);

        expect(
            screen.getByLabelText(/password/i),
        ).toBeInTheDocument();
    });

});