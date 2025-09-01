import { login, signUp } from "../controllers/userProfileController.js"
import { addDonationRequest } from "../controllers/donationRequestController.js"
import { addDonation } from "../controllers/donationController.js"
import {  protect } from "../middleWare/authMiddleware.js"
import { group } from "../utils/routerUtils.js"

export function publicUserRoutes(router) {
    router.post('/signup', signUp)
    router.post("/login",login)
    group("/", (rootRouter)=>{
        rootRouter.use(protect(['public']));
        rootRouter.post("/donation/add",addDonationRequest)
        rootRouter.post("/donation/donate",addDonation)
    });
}