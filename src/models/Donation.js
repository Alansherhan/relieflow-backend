import mongoose from "mongoose";
import { itemSchema } from "./common.js";



// donation done by a single individual maybe answering to a donation request or independent
const donationSchema = new mongoose.Schema({
    donatedBy: {
        type: String,
        required:false
    },
    donationType: {
        type: String,
        required: true,
        enum: ["cash", "item"]
    },
    amount: {
        type: Number,
        required: false
    },
    itemDetails: [{
        type:itemSchema,
        required: false
    }],
    priority: {
        type: String,
        required: true,
        enum: ["low", "medium", "high"]
    },
    status: {
        type: String,
        required: true,
        enum: ["accepted", "pending", "rejected"]
    }
})