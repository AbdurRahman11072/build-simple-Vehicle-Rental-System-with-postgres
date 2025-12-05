import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

const modulerRouter = [
  {
    path: "/api/v1/auth",
    route: authRoutes,
  },
];

modulerRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export const appRouter = router;
