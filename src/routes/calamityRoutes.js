import { Router } from "express";
import { addCalamity, getAllCalamityTypes } from "../controllers/calamityTypeController.js";


const calamityRouter =Router();
calamityRouter.post("/add",addCalamity)
calamityRouter.get('/', getAllCalamityTypes)

export default calamityRouter;