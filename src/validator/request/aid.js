import { z } from 'zod';

export const aidSchema = z.object({
  calamityType: z.string().min(1, 'Calamity Type is required'),
  address: z.object({
    addressLine1: z.string().min(1, 'Address is required'),
  }),
  location: z
    .object({
      type: z.literal('Point'), // Must be exactly 'Point'
      coordinates: z.tuple([z.coerce.number(), z.coerce.number()]), // [longitude, latitude]
    })
    .optional(),
  description: z.string().optional(),
});
