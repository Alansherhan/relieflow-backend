import DonationSchema from "../models/Donation.js";

export const addDonation = async (req, res) => {
    const donatedBy = req.body.donatedBy;
    const itemDetails = req.body.itemDetails;
    try {

        const donation = await DonationSchema.create({
            donatedBy: donatedBy,
            donationType: "item",
            itemDetails: itemDetails,
            priority: "high",
            status: "accepted"
        })

        return res.status(201).json({
            success: true,
            message: donation
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            // success: false,
            message: "Donation failed"
        })
    }
};