import { z } from 'zod';

export const vehicleSchema = z.object({
  make: z
    .string({
      error: 'Make is required',
    })
    .trim()
    .min(1, 'Make is required'),

  model: z
    .string({
      error: 'Model is required',
    })
    .trim()
    .min(1, 'Model is required'),

  category: z
    .string({
      error: 'Category is required',
    })
    .trim()
    .min(1, 'Category is required'),

  price: z.number({
    error: 'Price is required',
  }),

  quantity: z.number({
    error: 'Quantity is required',
  }),
});
