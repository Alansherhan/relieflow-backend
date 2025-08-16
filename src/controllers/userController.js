import User from "../models/User.js";

export const signUp = async (req, res) => {
    // res.status(201).json({ name: ""})
    const email = req.body.email;
    const password = req.body.password;
    try {
        const createdUser = await User.create({
            email: email,
            password: password
        })

        return res.status(201).json({
            message: "user created"
        })

    } catch (error) {
         console.log(error)
         return res.status(500).json({
            message: error.code === 11000 ? "duplicate email" : error

    })
}
};