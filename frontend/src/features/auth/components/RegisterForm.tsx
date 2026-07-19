import { useState } from 'react';

interface RegisterFormProps {
    onSubmit?: (credentials: {
        name: string;
        email: string;
        password: string;
    }) => void;
}

export function RegisterForm({
    onSubmit,
}: RegisterFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setError(
                'Invalid email format',
            );

            return;
        }

        if (password.length < 8) {
            setError(
                'Password must be at least 8 characters',
            );

            return;
        }

        setError('');

        onSubmit?.({
            name,
            email,
            password,
        });
    }

    return (
        <form onSubmit={handleSubmit} noValidate >
            <label htmlFor="name">
                Name
            </label>

            <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />

            <label htmlFor="email">
                Email
            </label>

            <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />

            <label htmlFor="password">
                Password
            </label>

            <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            {error && (
                <p role="alert">
                    {error}
                </p>
            )}

            <button type="submit">
                Register
            </button>
        </form>
    );
}