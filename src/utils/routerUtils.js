import express from 'express';
const app = express();

/**
 * Group helper: creates a router, passes it into callback,
 * mounts it under a given prefix.
 */
export function group(prefix, routesFn, parentRouter = app) {
  const router = express.Router();
  routesFn(router); // user defines routes here
  parentRouter.use(prefix, router);
  return router;
}
