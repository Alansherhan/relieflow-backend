import { z } from 'zod';

// Admin signup validation
export const adminSignupSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

// Add calamity type validation
export const addCalamitySchema = z.object({
  calamityName: z
    .string({ required_error: 'Calamity name is required' })
    .min(1, 'Calamity name is required'),
});

// Assign task validation
export const assignTaskSchema = z.object({
  taskName: z
    .string({ required_error: 'Task name is required' })
    .min(1, 'Task name is required'),
  taskType: z
    .string({ required_error: 'Task type is required' })
    .min(1, 'Task type is required'),
  assignedVolunteers: z.array(z.string()).optional(),
  donationRequest: z.string().optional(),
  volunteersNeeded: z.coerce.number().min(1).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

// Address validation schema
const addressSchema = z.object({
  addressLine1: z
    .string({ required_error: 'Address Line 1 is required' })
    .min(1, 'Address Line 1 is required'),
  addressLine2: z
    .string()
    .optional(),
  addressLine3: z
    .string()
    .optional(),
  pinCode: z
    .union([
      z.number().int('PIN code must be a whole number'),
      z.string().regex(/^\d+$/, 'PIN code must contain only digits').transform(Number),
    ])
    .optional(),
  location: z.object({
    type: z.literal('Point').optional(),
    coordinates: z.array(z.number()).optional(),
  }).optional(),
});

// Add relief center validation
export const addCenterSchema = z.object({
  shelterName: z
    .string({ required_error: 'Shelter name is required' })
    .min(1, 'Shelter name is required')
    .regex(/^[A-Za-z\s]+$/, 'Shelter name must contain only letters and spaces (no numbers or special characters)'),
  coordinatorName: z
    .string({ required_error: 'Coordinator name is required' })
    .min(1, 'Coordinator name is required')
    .regex(/^[A-Za-z\s]+$/, 'Coordinator name must contain only letters and spaces (no numbers or special characters)'),
  coordinatorNumber: z
    .string({ required_error: 'Coordinator number is required' })
    .min(1, 'Coordinator number is required')
    .max(10, 'Number must be at most 10 digits')
    .regex(/^\d+$/, 'Coordinator number must contain only digits'),
  address: addressSchema.optional(),
});

// Add notification validation
export const addNotificationSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title is required')
    .regex(/^[A-Za-z\s!.,:\-]+$/, 'Title must contain only letters, spaces, and basic punctuation (no numbers)'),
  body: z
    .string({ required_error: 'Message body is required' })
    .min(1, 'Message body is required'),
  type: z
    .string({ required_error: 'Notification type is required' })
    .min(1, 'Notification type is required'),
  targetUserType: z
    .enum(['volunteer', 'public', 'all'])
    .optional(),
  recipientId: z
    .string()
    .nullable()
    .optional(),
});
