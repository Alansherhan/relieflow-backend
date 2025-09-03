import CalamityType from "../models/CalamityType.js"

export const addCalamity = async (req, res) => {
    // res.status(201).json({ name: ""})
    const calamityName = req.body.calamityName;
    try {
        const createdUser = await CalamityType.create({
            calamityName:calamityName
        })

        return res.status(201).json({
            success:true,
            message: createdUser
        })

    } catch (error) {
         console.log(error)
         return res.status(500).json({
            message: error

    })
}
};

export const getAllCalamityTypes = async (req, res)=>{
    try{
        const calamityTypes = await CalamityType.find().select("calamityName");
        console.log(calamityTypes)
        return res.status(200).json({
            success:true,
            message:calamityTypes
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}