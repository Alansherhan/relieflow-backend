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
    const address=req.body.address;
    // Get imageUrl from uploaded file or from body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
    const description=req.body.description;
    //const location=req.body.location;
    // Get user ID from authenticated user (set by protect middleware)
    const aidRequestedBy = req.user?._id || req.user?.id;

    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    if (!calamityType || !address){
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
            address:address,
           // location: location,
            imageUrl: imageUrl,
            description: description,
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
        const aidRequest = await AidRequest.find().sort({ _id: -1 }).lean();
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

// Get aid requests for the logged-in public user
export const getMyAidRequests = async (req, res) => {
    try {
        // Note: JWT payload has 'id' not '_id'
        const userId = req.user._id || req.user.id;
        
        console.log('=== getMyAidRequests DEBUG ===');
        console.log('req.user:', req.user);
        console.log('userId:', userId);
        
        const aidRequests = await AidRequest.find({ aidRequestedBy: userId })
            .populate('calamityType')
            .sort({ createdAt: -1 })
            .lean();
        
        console.log('Found aidRequests:', aidRequests.length);
        console.log('aidRequests:', JSON.stringify(aidRequests, null, 2));
        
        return res.status(200).json({
            success: true,
            message: aidRequests
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// export const update

