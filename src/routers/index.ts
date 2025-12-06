import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { vehiclesRoutes } from "../modules/vehicles/vehicles.routes";
import { initDB } from "../db/db";

const router = Router();
initDB();

const modulerRouter = [
  {
    path: "/api/v1/auth",
    route: authRoutes,
  },
  {
    path: "/api/v1/vehicles",
    route: vehiclesRoutes,
  },
];

modulerRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export const appRouter = router;
