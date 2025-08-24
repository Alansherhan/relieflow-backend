import { Router } from "express";
import adminRoutes  from "./adminRoutes.js";
import adminAuthRoutes from "./authRoutes.js";

const router=Router();

router.use('/admin', adminRoutes)
router.use("/auth",adminAuthRoutes)

export default router;