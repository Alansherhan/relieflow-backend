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
        required: false
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
        type:Number,
        required:true,
    },
    unit:{
        type:String,
        required:true,
        enum:["pieces","kg","liters","packs","boxes","units"],
        default:"pieces"
    },
    // Track how much of this item has been fulfilled by donations
    fulfilledQuantity:{
        type:Number,
        default:0
    },
    // Reference to the original DonationRequest item _id (used in PortalDonation
    // to match donated items back to the correct request item, especially when
    // multiple items share the same category)
    requestItemId:{
        type:mongoose.Types.ObjectId,
        required:false
    }
})