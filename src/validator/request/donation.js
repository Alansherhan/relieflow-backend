import { z } from "zod";

export const donationSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    amount: z.number().min(1, 'Amount is required'),
    upiId: z.string().min(1, 'UPI ID is required'),
    imageUrl: z.string().min(1, 'Image URL is required'),
    itemdetails: z.string().min(1, 'Item details is required'),
    location: z.object({
        type: z.literal('Point'),  // Must be exactly 'Point'
        coordinates: z.tuple([z.number(), z.number()])  // [longitude, latitude]
    })

})
