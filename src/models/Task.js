import mongoose from "mongoose";
import userProfile from "./userProfile.js";
import AidRequest from "./AidRequest.js";
// import AidRequest from "./AidRequest.js";
import DonationRequest from "./DonationRequest.js";

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
        ref:userProfile.modelName
    },
    aidRequest:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:AidRequest.modelName
    },
    donationRequest:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:DonationRequest.modelName
    }
})

export default mongoose.model("TaskSchema",taskSchema)