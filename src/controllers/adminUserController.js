import Admin from "../models/adminUser.js";

export const adminSignUp = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //const position=req.body.position;
    try {
        const createdAdmin = await Admin.create({
            email: email,
            password: password,
            position:"NGO"
        })

        return res.status(201).json({
            success:true,
            message: createdAdmin
        })

    } catch (error) {
         console.log(error)
         return res.status(500).json({
            message: error.code === 11000 ? "duplicate email" : error

    })
}
};