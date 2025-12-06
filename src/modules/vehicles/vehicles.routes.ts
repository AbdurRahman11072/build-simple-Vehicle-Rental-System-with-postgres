import { Router } from "express";
import { vehicalesController } from "./vehicles.controller";
import { initDB } from "../../db/db";

const router = Router();
initDB();
router.get("/", vehicalesController.getAllVehicles);
router.get("/:vehicleId", vehicalesController.getVehiclesById);
router.post("/", vehicalesController.createVehicles);
router.delete("/:vehicleId", vehicalesController.deleteVehiclesById);
router.put("/:vehicleId", vehicalesController.updateVehiclesById);

export const vehiclesRoutes = router;
