import mongoose from "mongoose"
import { locationSchema } from "./common.js"

const aidRequestSchema = new mongoose.Schema({
    calamityType: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "CalamityType"
    },
    location: {
        type: locationSchema
    },
    imageUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ["accepted", "pending", "rejected"]
    },
    priority: {
        type: String,
        required: true,
        enum:["high","medium","low"]
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Users"
    }

})
export default mongoose.model("AidRequest", aidRequestSchema)