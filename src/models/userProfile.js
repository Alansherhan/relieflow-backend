import mongoose from "mongoose";
import { addressSchema } from "./common.js";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:addressSchema,
        
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        select: false,
        requied:true
    },
    role:{
        type:String,
        required:true,
        enum:["public","volunteer"]
    },
    skill:{
        type:String,
        enum:["police","nss","fire force","ncc","student police","scout","other"]
    }
})

export default mongoose.model("userProfile",userSchema)