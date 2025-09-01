import mongoose from "mongoose";
// import AidRequest from "./AidRequest.js";
// import DonationRequest from "./DonationRequest.js";

const taskSchema=new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    taskType:{
        type:String,
        required:true,
        enum:["aid","donation"]
    },
    status:{
        type:String,
        required:true,
        enum:["accepted","pending","rejected"]
    },
    priority:{
        type:String,
        required:true,
        enum:["high","medium","low"]
    },
    assignedTo:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"userProfile"
    },
    aidRequest:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:"AidRequest"
    },
    donationRequest:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:"DonationRequest"
    }
})

export default mongoose.model("TaskSchema",taskSchema)