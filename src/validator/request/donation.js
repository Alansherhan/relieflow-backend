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

// Donation request validation schema
export const donationSchema = z
  .object({
    title: z
      .string({ required_error: 'Please enter a title' })
      .min(1, 'Please enter a title')
      .max(100, 'Title must be at most 100 characters'),

    description: z
      .string({ required_error: 'Please enter a description' })
      .min(1, 'Please enter a description')
      .max(1000, 'Description must be at most 1000 characters'),

    donationType: z.enum(['cash', 'item'], {
      errorMap: () => ({ message: 'Please select a donation type' }),
    }),

    amount: z.coerce.number().optional(),

    upiNumber: z.string().optional(),

    itemDetails: z.preprocess(
      jsonPreprocess,
      z
        .array(
          z.object({
            category: z.enum(
              ['food', 'medical supplies', 'clothes', 'blankets', 'other'],
              {
                errorMap: () => ({ message: 'Please select a valid category' }),
              }
            ),
            description: z.string().optional(),
            quantity: z.coerce
              .number({ required_error: 'Please enter quantity' })
              .min(1, 'Quantity must be at least 1'),
            unit: z
              .enum(['pieces', 'kg', 'liters', 'packs', 'boxes', 'units'], {
                errorMap: () => ({ message: 'Please select a valid unit' }),
              })
              .default('pieces'),
          })
        )
        .optional()
    ),

    priority: z
      .enum(['low', 'medium', 'high'], {
        errorMap: () => ({ message: 'Priority must be low, medium, or high' }),
      })
      .default('medium'),

    deadline: z.string().optional(),

    location: z.preprocess(
      jsonPreprocess,
      z
        .object(
          {
            type: z.literal('Point'),
            coordinates: z.tuple([z.coerce.number(), z.coerce.number()]),
          },
          { required_error: 'Please provide your current location' }
        )
        .optional()
    ),

    address: z.preprocess(
      jsonPreprocess,
      z
        .object(
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
        .optional()
    ),
  })
  .superRefine((data, ctx) => {
    if (data.donationType === 'cash') {
      if (!data.amount || data.amount <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter an amount greater than 0',
          path: ['amount'],
        });
      }
      if (!data.upiNumber || data.upiNumber.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter your UPI number',
          path: ['upiNumber'],
        });
      }
    }

    if (data.donationType === 'item') {
      if (!data.itemDetails || data.itemDetails.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please add at least one item',
          path: ['itemDetails'],
        });
      }
      if (!data.location) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please provide your current location',
          path: ['location'],
        });
      }
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter your address',
          path: ['address'],
        });
      }
    }
  });
