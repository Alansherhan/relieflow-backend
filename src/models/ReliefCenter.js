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


// Create virtual field for formatted address
reliefCenter.virtual('formattedAddress').get(function () {
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
reliefCenter.set('toJSON', { virtuals: true });
reliefCenter.set('toObject', { virtuals: true });


export default mongoose.model("ReliefCenter", reliefCenter)