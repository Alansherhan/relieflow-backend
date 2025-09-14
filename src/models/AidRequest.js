import mongoose from "mongoose"
import { addressSchema} from "./common.js"

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

// Create virtual field for formatted address
aidRequestSchema.virtual('formattedAddress').get(function () {
  const { address } = this
  if (!address) return ''

  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.addressLine3
  ].filter(line => line && line.trim() !== '')

  const pin = address.pinCode ? `– ${address.pinCode}` : ''

  return parts.join(', ') + ' ' + pin
});

// Ensure virtuals are serialized
aidRequestSchema.set('toJSON', { virtuals: true });
aidRequestSchema.set('toObject', { virtuals: true });

export default mongoose.model("AidRequest", aidRequestSchema)