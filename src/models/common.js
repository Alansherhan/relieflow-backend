import mongoose from "mongoose";

export const locationSchema = new mongoose.Schema({
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

export const addressSchema = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    addressLine3: {
        type: String
    },
    pinCode: {
        type: Number,
        required: true
    },
    location: {
        type: locationSchema
    }
})

export const itemSchema= new mongoose.Schema({
    category:{
        type:String,
        required:true,
        enum:["food","medical supplies","clothes","blankets","other"]
    },
    description:{
        type:String,
        required:false
    },
    quantity:{
        type:String,
        required:true,
    }
})