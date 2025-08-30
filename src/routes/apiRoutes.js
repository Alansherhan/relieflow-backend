import { Router } from "express";
import { group } from "../utils/routerUtils.js";
import { adminRoutes } from "./adminRoutes.js";
import { publicUserRoutes } from "./publicUser.routes.js";

const router = Router()

group(
    '/api',
    (apiRouter) => {
        group('/admin', adminRoutes, apiRouter);
        group('/public', publicUserRoutes, apiRouter)
    },
    router
)

export default router;
