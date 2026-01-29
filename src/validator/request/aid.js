import { z } from "zod";

export const aidSchema = z.object({
    image: z.string().min(1, 'Image is required'),
    calamityType: z.string().min(1, 'Calamity Type is required'),
    address: z.string().min(1, 'Address is required'),
    locationSchema: z.object({
        type: z.literal('Point'),  // Must be exactly 'Point'
        coordinates: z.tuple([z.number(), z.number()])  // [longitude, latitude]
    })
}) 