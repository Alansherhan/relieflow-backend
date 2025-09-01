import { login, signUp } from "../controllers/userProfileController.js"
import { addDonationRequest } from "../controllers/donationRequestController.js"
import { addDonation } from "../controllers/donationController.js"

export function publicUserRoutes(router) {
    router.post('/signup', signUp)
    router.post("/login",login)
    router.post("/donation/add",addDonationRequest)
    router.post("/donation/donate",addDonation)
}