import { useState } from 'react';

import axios from 'axios';

import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSubmit?: (credentials: { email: string; password: string }) => Promise<unknown> | void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({
          email,
          password,
        });
      } else {
        await login({
          email,
          password,
        });

        navigate('/vehicles');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
      <h1 className="mb-2 text-center text-3xl font-bold">Welcome Back</h1>

      <p className="mb-8 text-center text-gray-500">Login to your dealership dashboard.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block font-medium">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block font-medium">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
