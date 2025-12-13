import { deleteUser, login, signUp, updateProfile,getUserProfile, changePassword, forgotPassword, verifyResetToken, resetPassword  } from "../controllers/userProfileController.js"
import { addDonationRequest, deletedDonationRequest, getAllDonationRequests, updateDonationRequest } from "../controllers/donationRequestController.js"
import { addDonation, getAllDonations } from "../controllers/donationController.js"
import {  protect } from "../middleWare/authMiddleware.js"
import { group } from "../utils/routerUtils.js"

export function publicUserRoutes(router) {
    router.post('/signup', signUp)
    router.post("/login",login)
    router.get('/profile', protect(['public', 'volunteer']), getUserProfile)
    router.put('/update/:id',updateProfile)
    router.delete('/delete/:id',deleteUser)
    router.post('/forgot-password', forgotPassword);
router.get('/verify-reset-token/:token', verifyResetToken);
router.post('/reset-password', resetPassword);
    router.put('/change-password', protect(), changePassword);
    group("/donation", (rootRouter)=>{
        // rootRouter.use(protect(['public']));
        rootRouter.post("/request/add",addDonationRequest)
        rootRouter.get("/request/",getAllDonationRequests)
        rootRouter.put("/update-donation/:id",updateDonationRequest)
        rootRouter.delete("/delete/:id",deletedDonationRequest)
       
        rootRouter.post("/donate",addDonation)
        rootRouter.get("/",getAllDonations)
    }, router);
}