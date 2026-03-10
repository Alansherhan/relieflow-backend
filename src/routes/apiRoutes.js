import { Router } from 'express';
import { group } from '../utils/routerUtils.js';
import { adminRoutes } from './adminRoutes.js';
import { publicUserRoutes } from './publicUser.routes.js';
import { tipsRoutes } from './tipsRoutes.js';

const router = Router();

group(
  '/api',
  (apiRouter) => {
    group('/admin', adminRoutes, apiRouter);
    group('/public', publicUserRoutes, apiRouter);
    group('/', tipsRoutes, apiRouter);
  },
  router
);

export default router;
