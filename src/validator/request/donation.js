import { z } from 'zod';

export const donationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  donationType: z.enum(['cash', 'item'], {
    required_error: 'Donation type is required',
  }),
  amount: z.union([z.string(), z.number()]).optional(),
  upiNumber: z.string().optional(),
  itemDetails: z.union([z.string(), z.array(z.any())]).optional(), // Can be JSON string or array
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  deadline: z.string().optional(),
  location: z
    .union([
      z.string(), // JSON string from multipart form
      z.object({
        type: z.literal('Point'),
        coordinates: z.tuple([z.number(), z.number()]),
      }),
    ])
    .optional(),
  address: z.union([z.string(), z.object({}).passthrough()]).optional(), // Can be JSON string or object
});
