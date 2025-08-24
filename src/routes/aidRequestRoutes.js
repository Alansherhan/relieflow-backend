import { Router } from "express";
import { addAidRequest, getAidRequest,getAllAidRequests } from "../controllers/aidRequestController.js";


const aidRequestRouter=Router();

aidRequestRouter.get("/",getAidRequest)
aidRequestRouter.get("/allAid",getAllAidRequests)
aidRequestRouter.post("/add",addAidRequest)



export default aidRequestRouter;