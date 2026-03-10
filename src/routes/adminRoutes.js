import { group } from "../utils/routerUtils.js";

import { adminSignUp } from "../controllers/adminUserController.js";
import { getAllCalamityTypes, addCalamity, deleteCalamityType } from "../controllers/calamityTypeController.js";
import { getAllAidRequests, addAidRequest, getAidRequest, deleteAidRequest } from "../controllers/aidRequestController.js";
import { assignTask, deleteTask, getAllTasks, createTaskFromAidRequest, searchVolunteers } from "../controllers/taskController.js";
import { addCenter, deleteReliefCenter, getAllReliefCenters, getReliefCenter, updateReliefCenter } from "../controllers/reliefCenterController.js";
import { validate } from "../middleWare/validate.js";
import { adminSignupSchema, addCalamitySchema, assignTaskSchema, addCenterSchema } from "../validator/admin/admin.js";

export function adminRoutes(router) {
    router.post('/signup', validate(adminSignupSchema), adminSignUp);
    group(
        '/calamity',
        (calamityRouter) => {
            calamityRouter.post("/add", validate(addCalamitySchema), addCalamity);
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
            taskrouter.post("/assign", validate(assignTaskSchema), assignTask)
            taskrouter.get("/",getAllTasks)
            taskrouter.delete("/delete/:id",deleteTask)
            taskrouter.post("/create-from-aid-request/:aidRequestId", createTaskFromAidRequest)
            taskrouter.get("/search-volunteers", searchVolunteers)
        },
        router
    );
    group(
        '/center',
        (centerRouter)=>{
            centerRouter.post("/add", validate(addCenterSchema), addCenter)
            centerRouter.get("/:id",getReliefCenter)
            centerRouter.get("/",getAllReliefCenters)
            centerRouter.put("/:id",updateReliefCenter)
            centerRouter.delete("/delete/:id",deleteReliefCenter)
        },
        router
    );
}
