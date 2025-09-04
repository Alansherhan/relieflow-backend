import { group } from "../utils/routerUtils.js";

import { adminSignUp } from "../controllers/adminUserController.js";
import { getAllCalamityTypes, addCalamity, deleteCalamityType } from "../controllers/calamityTypeController.js";
import { getAllAidRequests, addAidRequest, getAidRequest, deleteAidRequest } from "../controllers/aidRequestController.js";
import { assignTask, deleteTask, getAllTasks } from "../controllers/taskController.js";
import { addCenter, deleteReliefCenter, getAllReliefCenters, getReliefCenter } from "../controllers/reliefCenterController.js";



export function adminRoutes(router) {
    router.post('/signup', adminSignUp);
    group(
        '/calamity',
        (calamityRouter) => {
            calamityRouter.post("/add", addCalamity);
            calamityRouter.get('/', getAllCalamityTypes);
            calamityRouter.delete('/delete/:id',deleteCalamityType);
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
            taskrouter.delete("/delete/:id",deleteTask)
        },
        router
    );
    group(
        '/center',
        (centerRouter)=>{
            centerRouter.post("/add",addCenter)
            centerRouter.get("/:id",getReliefCenter)
            centerRouter.get("/",getAllReliefCenters)
            centerRouter.delete("/delete/:id",deleteReliefCenter)
        },
        router
    );
}
