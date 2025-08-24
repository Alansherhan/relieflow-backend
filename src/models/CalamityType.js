import mongoose from "mongoose"

const calamityType=new mongoose.Schema({
    calamityName:{
        type:String,
        unique:true
    }
})

export default mongoose.model("CalamityType",calamityType)