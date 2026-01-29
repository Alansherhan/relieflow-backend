import { z } from 'zod';

// Signup validation schema
export const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    address: z.string().min(1, 'Address is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['public', 'volunteer'], {
        errorMap: () => ({ message: 'Role must be either public or volunteer' }),
    }),
});

// Login validation schema
export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});
