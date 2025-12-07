import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth(["admin"]), bookingController.addBooking);
router.get("/", auth(["admin", "customer"]), bookingController.getAllBooking);

export const bookingRoutes = router;
