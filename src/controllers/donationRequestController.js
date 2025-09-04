import DonationRequest from "../models/DonationRequest.js";

export const addDonationRequest = async (req, res) => {
    const requestedBy = req.body.requestedBy;
    const itemDetails= req.body.itemDetails;
    const amount=req.body.amount;

    try {
        const donationRequest = await DonationRequest.create({
            requestedBy: requestedBy,
            donationType: "item",
            itemDetails:itemDetails,
            amount:amount,
            priority: "low",
            status: "accepted"
        })

        return res.status(201).json({
            success:true,
            message: donationRequest
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Invalid Request",
            success:false
        })
    }
};

export const getAllDonationRequests=async(req,res)=>{
    try{
        const allDonationRequests=await DonationRequest.find().lean();
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

    const data =await DonationRequest.findOne(id);

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