import ReliefCenter from "../models/ReliefCenter.js";
export const addCenter = async (req, res) => {
    // res.status(201).json({ name: ""})
    const shelterName = req.body.shelterName;
    const address = req.body.address;
    const coordinatorName = req.body.coordinatorName;
    const coordinatorNumber = req.body.coordinatorNumber;


    if(coordinatorNumber.length > 10){
        return res.status(201).json({
            message: 'Please enter a valid number !!!s'
        })
    }

    try {
        const createdUser = await ReliefCenter.create({
            shelterName: shelterName,
           address: address,
            coordinatorName: coordinatorName,
            coordinatorNumber: coordinatorNumber
        })

        return res.status(201).json({
            message: createdUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.code === 11000 ? "duplicate email" : error

        })
    }
};