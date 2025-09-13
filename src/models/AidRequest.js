import mongoose from "mongoose"
import { addressSchema, locationSchema } from "./common.js"

const aidRequestSchema = new mongoose.Schema({
    calamityType: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "CalamityType"
    },
    address:{
        type:addressSchema,
        required:true
    },
    // location: {
    //     type: locationSchema
    // },
    imageUrl: {
        type: String,
        required:false
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
    aidRequestedBy:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"userProfile"
    }

})
export default mongoose.model("AidRequest", aidRequestSchema)