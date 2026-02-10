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

// Add relief center validation
export const addCenterSchema = z.object({
  shelterName: z
    .string({ required_error: 'Shelter name is required' })
    .min(1, 'Shelter name is required'),
  coordinatorName: z
    .string({ required_error: 'Coordinator name is required' })
    .min(1, 'Coordinator name is required'),
  coordinatorNumber: z
    .string({ required_error: 'Coordinator number is required' })
    .min(1, 'Coordinator number is required')
    .max(10, 'Number must be at most 10 digits'),
});
