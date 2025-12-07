import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { vehiclesRoutes } from "../modules/vehicles/vehicles.routes";
import { initDB } from "../db/db";
import { userController } from "../modules/users/users.controller";
import { userRoutes } from "../modules/users/users.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";

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
  {
    path: "/api/v1/users",
    route: userRoutes,
  },
  {
    path: "/api/v1/bookings",
    route: bookingRoutes,
  },
];

modulerRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export const appRouter = router;
