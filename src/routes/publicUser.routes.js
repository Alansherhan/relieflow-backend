import { deleteUser, login, signUp, updateProfile } from "../controllers/userProfileController.js"
import { addDonationRequest, deletedDonationRequest, getAllDonationRequests, updateDonationRequest } from "../controllers/donationRequestController.js"
import { addDonation, getAllDonations } from "../controllers/donationController.js"
import {  protect } from "../middleWare/authMiddleware.js"
import { group } from "../utils/routerUtils.js"

export function publicUserRoutes(router) {
    router.post('/signup', signUp)
    router.post("/login",login)
    router.put('/:id',updateProfile)
    router.delete('/:id',deleteUser)
    group("/donation", (rootRouter)=>{
        // rootRouter.use(protect(['public']));
        rootRouter.post("/request/add",addDonationRequest)
        rootRouter.get("/request/",getAllDonationRequests)
        rootRouter.put("/:id",updateDonationRequest)
        rootRouter.delete("/delete/:id",deletedDonationRequest)
       
        rootRouter.post("/donate",addDonation)
        rootRouter.get("/",getAllDonations)
    }, router);
}