import mongoose from "mongoose"
import {addressSchema} from './common.js' 
 


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