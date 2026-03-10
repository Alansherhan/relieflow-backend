import ReliefCenter from '../models/ReliefCenter.js';
import axios from 'axios';

export const addCenter = async (req, res) => {
  // res.status(201).json({ name: ""})
  const shelterName = req.body.shelterName;
  const addressModel = req.body.address; // This is the address object from the frontend/admin
  const coordinatorName = req.body.coordinatorName;
  const coordinatorNumber = req.body.coordinatorNumber;

  // Validate shelter name: letters and spaces only
  if (!/^[A-Za-z\s]+$/.test(shelterName)) {
    return res.status(400).json({
      success: false,
      message: 'Shelter name must contain only letters (no numbers or special characters)',
    });
  }

  // Validate coordinator name: letters and spaces only
  if (!/^[A-Za-z\s]+$/.test(coordinatorName)) {
    return res.status(400).json({
      success: false,
      message: 'Coordinator name must contain only letters (no numbers or special characters)',
    });
  }

  // Validate coordinator number: digits only, max 10
  if (!/^\d{1,10}$/.test(coordinatorNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Coordinator number must contain only digits (max 10)',
    });
  }

  // Validate address fields if provided
  if (addressModel) {
    if (addressModel.addressLine1 && typeof addressModel.addressLine1 !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Address Line 1 must be a string',
      });
    }
    if (addressModel.pinCode !== undefined && addressModel.pinCode !== null && addressModel.pinCode !== '') {
      const pinCode = Number(addressModel.pinCode);
      if (isNaN(pinCode) || !Number.isInteger(pinCode)) {
        return res.status(400).json({
          success: false,
          message: 'PIN code must be a valid integer',
        });
      }
    }
  }

  try {
    const createdUser = await ReliefCenter.create({
      shelterName: shelterName,
      address: addressModel,
      coordinatorName: coordinatorName,
      coordinatorNumber: coordinatorNumber,
    });

    return res.status(201).json({
      success: true,
      message: createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.code === 11000 ? 'duplicate email' : error,
    });
  }
};

export const getAllReliefCenters = async (req, res) => {
  try {
    const allCenters = await ReliefCenter.find().sort({ _id: -1 }).lean();
    console.log(allCenters);
    return res.status(200).json({
      success: true,
      message: allCenters,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
};

export const deleteReliefCenter = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }
    const deletedCenter = await ReliefCenter.findById(id);
    if (!deletedCenter) {
      return res.status(404).json({
        success: false,
        message: 'Database is empty',
      });
    }
    await deletedCenter.deleteOne();
    console.log(deletedCenter);
    return res.status(201).json({
      success: true,
      message: 'Deleted Sucessfully',
    });
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete',
    });
  }
};


export const getReliefCenter=async(req,res)=>{
  const {id}=req.params;
  try{
    const reliefCenter=await ReliefCenter.findById(id)

    return res.status(201).json({
      success:true,
      message:"Relief Center Retrieved",
      data:reliefCenter
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      success:false,
      message:error
    })
  }
};
export const updateReliefCenter=async (req,res)=>{
  try{
    const {id}=req.params;

    const {shelterName,address,coordinatorName,coordinatorNumber}=req.body
    if(!id){
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }

    // Validate shelter name: letters and spaces only
    if (shelterName && !/^[A-Za-z\s]+$/.test(shelterName)) {
      return res.status(400).json({
        success: false,
        message: 'Shelter name must contain only letters and spaces (no numbers or special characters)',
      });
    }
    // Validate coordinator name: letters and spaces only
    if (coordinatorName && !/^[A-Za-z\s]+$/.test(coordinatorName)) {
      return res.status(400).json({
        success: false,
        message: 'Coordinator name must contain only letters and spaces (no numbers or special characters)',
      });
    }
    // Validate coordinator number: digits only, max 10
    if (coordinatorNumber && !/^\d{1,10}$/.test(coordinatorNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Coordinator number must contain only digits (max 10)',
      });
    }
    // Validate address pinCode if provided
    if (address?.pinCode !== undefined && address.pinCode !== null && address.pinCode !== '') {
      const pinCode = Number(address.pinCode);
      if (isNaN(pinCode) || !Number.isInteger(pinCode)) {
        return res.status(400).json({
          success: false,
          message: 'PIN code must be a valid integer',
        });
      }
    }

    const data=await ReliefCenter.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data not available',
      });
    }

    data.shelterName=shelterName 
    data.address=address
    data.coordinatorName=coordinatorName
    data.coordinatorNumber=coordinatorNumber
    
    await data.save()
    console.log("Data Updated Successfully",data)
    return res.status(201).json({
      success:true,
      message:"Data Updated Successfully"
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Unable to update data"
    })
  }
}