import { Router } from "express";
import { adminSignUp } from "../controllers/adminUserController.js";
// import ReliefCenter from "../controllers/reliefCenterController.js";


const adminAuthRoutes=Router();
adminAuthRoutes.post('/admin/signup',adminSignUp)


export default adminAuthRoutes;