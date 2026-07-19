import { useState } from 'react';

interface LoginFormProps {
  onSubmit?: (credentials: {
    email: string;
    password: string;
  }) => void;
}

export function LoginForm({
  onSubmit,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!email || !password) {
      setError(
        'Email and password are required',
      );

      return;
    }

    setError('');

    onSubmit?.({
      email,
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
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
        Login
      </button>
    </form>
  );
}