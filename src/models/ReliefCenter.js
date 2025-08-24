import mongoose from "mongoose"
import {locationSchema} from './common.js'

const addressSchema = new mongoose.Schema({
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
    location:{
        type:locationSchema
    }
})


const reliefCenter = new mongoose.Schema({
    shelterName: {
        type: String,
        required: true,
        unique:true
    },
    address: {
        type: addressSchema,
        required: true
    },
    coordinatorName: {
        type: String,
        required: true
    },
    coordinatorNumber: {
        type: String,
        required: true
    }
})


export default mongoose.model("ReliefCenter", reliefCenter)