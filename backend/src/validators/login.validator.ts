import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      error: 'Email is required',
    })
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address'),

  password: z
    .string({
      error: 'Password is required',
    })
    .min(1, 'Password is required'),
});