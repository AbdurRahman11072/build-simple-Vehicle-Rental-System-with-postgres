import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", bookingController.addBooking);

export const bookingRoutes = router;
