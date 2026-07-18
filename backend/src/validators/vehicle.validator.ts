import { z } from 'zod';

export const vehicleSchema = z.object({
  make: z
    .string({
      error: 'Make is required',
    })
    .trim()
    .min(1, 'Make is required'),

  model: z.string(),

  category: z.string(),

  price: z.number(),

  quantity: z.number(),
});