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
    const allDonationRequests=await DonationRequest.find().lean();
    console.log(allDonationRequests)
    return res.status(200).json({
        suucess:true,
        message:allDonationRequests
    })
}