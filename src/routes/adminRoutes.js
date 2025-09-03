import { group } from "../utils/routerUtils.js";

import { adminSignUp } from "../controllers/adminUserController.js";
import { getAllCalamityTypes, addCalamity } from "../controllers/calamityTypeController.js";
import { getAllAidRequests, addAidRequest, getAidRequest, deleteAidRequest } from "../controllers/aidRequestController.js";
import { assignTask, deletTask, getAllTasks } from "../controllers/taskController.js";
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
        '/aid',
        (aidRequestRouter) => {
            aidRequestRouter.get("/:id", getAidRequest)
            aidRequestRouter.get("/", getAllAidRequests)
            aidRequestRouter.post("/add", addAidRequest)
            aidRequestRouter.delete('/delete/:id',deleteAidRequest)
        },
        router
    );
    group(
        '/task',
        (taskrouter)=>{
            taskrouter.post("/assign",assignTask)
            taskrouter.get("/",getAllTasks)
            taskrouter.delete("/delete/:id",deletTask)
        },
        router
    );
    group(
        '/center',
        (centerRouter)=>{
            centerRouter.post("/add",addCenter)
            centerRouter.get("/",getAllReliefCenters)
            centerRouter.delete("/delete/:id",deleteReliefCenter)
        },
        router
    );
}
