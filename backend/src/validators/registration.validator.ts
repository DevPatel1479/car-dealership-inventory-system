import { z } from 'zod';

export const registrationSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.name.trim() || !data.email.trim() || !data.password.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'User registration details are required',
      });

      return;
    }

    if (!z.email().safeParse(data.email).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid email address',
      });
    }
  });
