import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    it('should render the register button', () => {
        render(<RegisterForm />);

        expect(
            screen.getByRole('button', {
                name: /register/i,
            }),
        ).toBeInTheDocument();
    });

    it('should submit the entered registration credentials', async () => {
        const user = userEvent.setup();

        const onSubmit = vi.fn();

        render(
            <RegisterForm onSubmit={onSubmit} />,
        );

        await user.type(
            screen.getByRole('textbox', {
                name: /name/i,
            }),
            'John Doe',
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
                name: /register/i,
            }),
        );

        expect(onSubmit).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        });
    });

});