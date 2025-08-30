import User from "../models/userProfile.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    try {

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(password, salt);


        const userCreated = await User.create({
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            role:"public",
            skill:"other"
        })

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            meassage: error.code === 11000 ? "duplicate email" : error
        })
    }
};

