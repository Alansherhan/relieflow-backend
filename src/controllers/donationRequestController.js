import DonationRequest from "../models/DonationRequest.js";

export const addDonationRequest = async (req, res) => {
    const requestedBy = req.body.requestedBy;
    const itemDetails= req.body.itemDetails;
    const amount=req.body.amount;
    const donationType=req.body.donationType;
    try {
        const donationRequest = await DonationRequest.create({
            requestedBy: requestedBy,
            donationType: donationType,
            itemDetails:itemDetails,
            amount:amount,
            priority: "low",
            status: "pending"
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
export const deleteDonationRequest= async (req,res)=>{
    const {id}=req.params;

    try{
        if (!id){
            return res.status(403).json({
                success:false,
                message:'id required'
        })
        }
        const deletedRequest=await DonationRequest.findById(id);
        if(!deletedRequest){
            return res.status(201).json({
                success:false,
                message:'Data not found'
        })
        }
        await deletedRequest.deleteOne();
        console.log(deletedRequest);
        return res.status(201).json({
            message:"Deleted Successfully",
            success:true
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Unable to delete"
         });
    }
}