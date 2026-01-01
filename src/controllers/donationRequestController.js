import DonationRequest from "../models/DonationRequest.js";

export const addDonationRequest = async (req, res) => {
    const {
        title,
        description,
        donationType,
        amount,
        itemDetails,
        priority,
        upiNumber,
        location,
        address,
        deadline,
        proofImages,
    } = req.body;

    // Get userId from JWT token (set by auth middleware)
    const requestedBy = req.user?._id || req.user?.id;

    // Validation
    if (!requestedBy) {
        return res.status(401).json({
            success: false,
            message: 'User not authenticated',
        });
    }

    if (!title || !description || !donationType) {
        return res.status(400).json({
            success: false,
            message: 'title, description, and donationType are required',
        });
    }

    if (donationType === 'cash' && !upiNumber) {
        return res.status(400).json({
            success: false,
            message: 'UPI number is required for cash donation requests',
        });
    }

    if (donationType === 'cash' && (!amount || amount <= 0)) {
        return res.status(400).json({
            success: false,
            message: 'Amount must be greater than 0 for cash donations',
        });
    }

    if (donationType === 'item' && (!itemDetails || itemDetails.length === 0)) {
        return res.status(400).json({
            success: false,
            message: 'At least one item is required for item donation requests',
        });
    }

    try {
        const donationRequest = await DonationRequest.create({
            requestedBy,
            title,
            description,
            donationType,
            amount: donationType === 'cash' ? amount : undefined,
            itemDetails: donationType === 'item' ? itemDetails : undefined,
            priority: priority || 'medium',
            upiNumber: donationType === 'cash' ? upiNumber : undefined,
            location,
            address,
            deadline: deadline ? new Date(deadline) : undefined,
            proofImages: proofImages || [],
            status: 'pending',
        });

        return res.status(201).json({
            success: true,
            message: 'Donation request created successfully',
            data: donationRequest,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create donation request",
            success: false,
            error: error.message,
        });
    }
};

export const getAllDonationRequests=async(req,res)=>{
    try{
        const allDonationRequests=await DonationRequest.find().sort({ _id: -1 }).lean();
        console.log(allDonationRequests)
        return res.status(200).json({
            sucess:true,
            message:allDonationRequests
    })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export const updateDonationRequest=async(req,res)=>{
try{
    const{id}=req.params;

    const{requestedBy,donationType,amount,itemDetails}=req.body

    if (!id) {
        return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }

    const data =await DonationRequest.findById(id);

    if (!data) {
        return res.status(404).json({
        success: false,
        message: 'Data not available',
      });
    }
    data.requestedBy=requestedBy
    data.donationType=donationType
    data.amount=amount
    data.itemDetails=itemDetails

    await data.save()
    console.log("Data Updated Successfully",data)
    return res.status(201).json({
      success:true,
      message:"Data Updated Successfully"
    })
}
catch (error){
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Unable to update data"
    })
}
}

export const deletedDonationRequest = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }
    const deletedDonationRequest = await DonationRequest.findById(id);
    if (!deletedDonationRequest) {
      return res.status(404).json({
        success: false,
        message: 'Database is empty',
      });
    }
    await deletedDonationRequest.deleteOne();
    console.log(deletedDonationRequest);
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