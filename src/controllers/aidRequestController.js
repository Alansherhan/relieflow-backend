import AidRequest from "../models/AidRequest.js";



export const getAidRequest = async (req, res) => {
    const {id} = req.params;
 
    try {
        const aid = await AidRequest.findById(id)

        return res.status(201).json({
            success: true,
            message:"Aid request retrieved",
            data: aid
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error

        })
    }
};



export const addAidRequest = async (req, res) => {

    // const {calamityType , location , imageUrl ,aidRequestedBy} = req.body
    const calamityType=req.body.calamityType;
    const location=req.body.location;
    const aidRequestedBy=req.body.aidRequestedBy;

    if (!calamityType || !location){
        return res.status(422).json(
            {
                success: false,
                message: "Validation Failed"
            }
        )
    }
 
    try {
        const aidCreated = await AidRequest.create({
            calamityType: calamityType,
            location: location,
            // imageUrl: imageUrl,
            status: "pending",
            priority: "low",
            aidRequestedBy:aidRequestedBy
        })

        const populatedAidData = await aidCreated.populate(["calamityType","aidRequestedBy"])

        return res.status(201).json({
            success: true,
            message: "Your aid request have been submitted",
            data: populatedAidData
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};

export const getAllAidRequests = async (req, res)=>{
    try {
        const aidRequest = await AidRequest.find().lean();
        console.log(aidRequest)
        return res.status(200).json({
            success:true,
            message:aidRequest
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

    
}


export const deleteAidRequest =  async (req,res) => {
    const { id } = req.params;

    try{
        if(!id){
            return res.status(403).json({
                success:false,
                message:'id required'
            })
        }
        const deletedAid=await AidRequest.findById(id);
        if(!deletedAid){
            return res.status(404).json({
                success:false,
                message:'Data not found'
            })
        }
        await deletedAid.deleteOne();
        console.log(deletedAid);
        return res.status(201).json({
            message:"Deleted Successfully",
            success:true
        })
    }
    catch(error){
        console.log(error)
         return res.status(500).json({
            success:false,
            message:"Unable to delete"
         });
    }
}

// export const update

