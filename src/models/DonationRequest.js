import mongoose from "mongoose";
import { itemSchema } from "./common.js";

const donationRequestSchema=new mongoose.Schema({
    requestedBy:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"userProfile"
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

export default mongoose.model("DonationRequest",donationRequestSchema)