import { group } from "../utils/routerUtils.js";

import { adminSignUp } from "../controllers/adminUserController.js";
import { getAllCalamityTypes, addCalamity } from "../controllers/calamityTypeController.js";
import { getAllAidRequests, addAidRequest, getAidRequest, deleteAidRequest } from "../controllers/aidRequestController.js";
import { assignTask, getAllTasks } from "../controllers/taskController.js";
import { addCenter, deleteReliefCenter, getAllReliefCenters } from "../controllers/reliefCenterController.js";


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
        '/aid-request',
        (aidRequestRouter) => {
            aidRequestRouter.get("/:id", getAidRequest)
            aidRequestRouter.get("/", getAllAidRequests)
            aidRequestRouter.post("/add", addAidRequest)
            aidRequestRouter.delete('/delete',deleteAidRequest)
        },
        router
    );
    group(
        '/task',
        (taskrouter)=>{
            taskrouter.post("/assign",assignTask)
            taskrouter.get("/get-all-tasks",getAllTasks)
        },
        router
    );
    group(
        '/center',
        (centerRouter)=>{
            centerRouter.post("/add",addCenter)
            centerRouter.get("/getAll",getAllReliefCenters)
            centerRouter.delete("/delete/:id",deleteReliefCenter)
        },
        router
    );
}
