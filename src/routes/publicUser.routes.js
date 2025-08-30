import { signUp } from "../controllers/userProfileController.js"
import { addDonationRequest } from "../controllers/donationRequestController.js"

export function publicUserRoutes(router) {
    router.post('/signup', signUp)
    // router.get("/login",)
    router.post("/donation/add",addDonationRequest)
}