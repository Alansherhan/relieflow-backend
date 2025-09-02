import { group } from "../utils/routerUtils.js";

import { adminSignUp } from "../controllers/adminUserController.js";
import { getAllCalamityTypes, addCalamity } from "../controllers/calamityTypeController.js";
import { getAllAidRequests, addAidRequest, getAidRequest, deleteAidRequest } from "../controllers/aidRequestController.js";
import { assignTask, getAllTasks } from "../controllers/taskController.js";
import { addCenter, getAllReliefCenters } from "../controllers/reliefCenterController.js";


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
            aidRequestRouter.delete('/delete',deleteAidRequest)
        },
        router
    );
    group(
        '/task',
        (taskrouter)=>{
            taskrouter.post("/assign",assignTask)
            taskrouter.get("/getAllTasks",getAllTasks)
        },
        router
    );
    group(
        '/center',
        (centerRouter)=>{
            centerRouter.post("/add",addCenter)
            centerRouter.get("/getAll",getAllReliefCenters)
        },
        router
    );
}
