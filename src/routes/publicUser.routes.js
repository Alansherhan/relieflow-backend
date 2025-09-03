import { login, signUp } from "../controllers/userProfileController.js"
import { addDonationRequest, deleteDonationRequest, getAllDonationRequests } from "../controllers/donationRequestController.js"
import { addDonation, getAllDonations } from "../controllers/donationController.js"
// import {  protect } from "../middleWare/authMiddleware.js"
import { group } from "../utils/routerUtils.js"

export function publicUserRoutes(router) {
    router.post('/signup', signUp)
    router.post("/login",login)
    group("/donation", (rootRouter)=>{
        // rootRouter.use(protect(['public']));
        rootRouter.post("/request/add",addDonationRequest)
        rootRouter.get("/request/",getAllDonationRequests)
        rootRouter.delete("/request/:id",deleteDonationRequest)
        rootRouter.post("/donate",addDonation)
        rootRouter.get("/",getAllDonations)
    }, router);
}