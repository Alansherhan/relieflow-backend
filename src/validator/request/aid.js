import { z } from 'zod';

// Helper: parse JSON string or pass through object
const jsonPreprocess = (val) => {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
};

// Aid request validation schema
export const aidSchema = z.object({
  calamityType: z
    .string({ required_error: 'Please select a calamity type' })
    .min(1, 'Please select a calamity type'),

  description: z
    .string({ required_error: 'Please enter a description' })
    .min(1, 'Please enter a description'),

  address: z.preprocess(
    jsonPreprocess,
    z.object(
      {
        addressLine1: z
          .string({ required_error: 'Please enter your address' })
          .min(1, 'Please enter your address'),
        addressLine2: z.string().optional(),
        addressLine3: z.string().optional(),
        pinCode: z.coerce.number().optional(),
      },
      { required_error: 'Please enter your address' }
    )
  ),

  location: z.preprocess(
    jsonPreprocess,
    z.object(
      {
        type: z.literal('Point'),
        coordinates: z.tuple([z.coerce.number(), z.coerce.number()]),
      },
      { required_error: 'Please provide your current location' }
    )
  ),

  imageUrl: z
    .string({ required_error: 'Please insert an image' })
    .min(1, 'Please insert an image')
    .optional(),
});
