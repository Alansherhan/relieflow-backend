import { login, signUp } from "../controllers/userProfileController.js"
import { addDonationRequest, getAllDonationRequests } from "../controllers/donationRequestController.js"
import { addDonation, getAllDonations } from "../controllers/donationController.js"
import {  protect } from "../middleWare/authMiddleware.js"
import { group } from "../utils/routerUtils.js"

export function publicUserRoutes(router) {
    router.post('/signup', signUp)
    router.post("/login",login)
    group("/", (rootRouter)=>{
        // rootRouter.use(protect(['public']));
        rootRouter.post("/donation/request/add",addDonationRequest)
        rootRouter.get("/donation/request/getAll",getAllDonationRequests)
        rootRouter.post("/donation/donate",addDonation)
        rootRouter.get("/donation/getAll",getAllDonations)
    }, router);
}