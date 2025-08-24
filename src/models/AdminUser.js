import mongoose from "mongoose"

const adminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required:true,
        enum:["NGO","localAuthority"]
    }
})
export default mongoose.model("Admin", adminUserSchema)