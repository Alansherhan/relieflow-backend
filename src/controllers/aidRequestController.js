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
    const calamityType = req.body.calamityType;
    const location = req.body.location;
    const imageUrl = req.body.imageUrl;

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
            imageUrl: imageUrl,
            status: "pending",
            priority: "low"
        })

        const populated = await aidCreated.populate("calamityType")

        return res.status(201).json({
            success: true,
            message: "Your aid request have been submitted",
            data: aidCreated
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};

export const getAllAidRequests = async (req, res)=>{
    const aidRequest = await AidRequest.find().lean();

    console.log(aidRequest)

    return res.status(200).json(aidRequest);
}


// export const update

