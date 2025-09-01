import { group } from "../utils/routerUtils.js";

import { adminSignUp } from "../controllers/adminUserController.js";
import { getAllCalamityTypes, addCalamity } from "../controllers/calamityTypeController.js";
import { getAllAidRequests, addAidRequest, getAidRequest } from "../controllers/aidRequestController.js";
import { assignTask } from "../controllers/taskController.js";


export function adminRoutes(router) {
    router.post('/signup', adminSignUp);
    group(
        '/calamity',
        (calamityRouter) => {
            calamityRouter.post("/add", addCalamity);
            calamityRouter.get('/', getAllCalamityTypes);
        },
        router,
    );
    group(
        '/aidRequest',
        (aidRequestRouter) => {
            aidRequestRouter.get("/", getAidRequest)
            aidRequestRouter.get("/allAid", getAllAidRequests)
            aidRequestRouter.post("/add", addAidRequest)
        },
        router
    );
    group(
        '/task',
        (taskrouter)=>{
            taskrouter.post("/assign",assignTask)
        },
        router
    );
}
