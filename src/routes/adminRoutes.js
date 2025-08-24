import { Router } from "express";
import calamityRouter from "./calamityRoutes.js";
import aidRequestRouter from "./aidRequestRoutes.js";

const router=Router();

router.use('/calamity', calamityRouter )
router.use('/aid',aidRequestRouter  )


export default router;