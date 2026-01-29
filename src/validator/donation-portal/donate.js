import { z } from "zod";

export const donateSchema = z.object({
    amount: z.number().min(1, 'Amount is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(['pending', 'approved', 'rejected'], {
        errorMap: () => ({ message: 'Status must be either pending, approved or rejected' }),
    }),
})
