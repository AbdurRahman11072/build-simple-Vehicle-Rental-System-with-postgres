import { Router } from "express";
import { vehicalesController } from "./vehicles.controller";

const router = Router();

router.get("/", vehicalesController.getAllVehicles);
router.post("/", vehicalesController.createVehicles);

export const vehiclesRoutes = router;
