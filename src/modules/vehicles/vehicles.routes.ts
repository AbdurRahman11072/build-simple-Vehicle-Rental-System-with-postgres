import { Router } from "express";
import { vehicalesController } from "./vehicles.controller";
import { initDB } from "../../db/db";

const router = Router();
initDB();
router.get("/", vehicalesController.getAllVehicles);
router.post("/", vehicalesController.createVehicles);
router.get("/:id", vehicalesController.getVehiclesById);
router.delete("/:id", vehicalesController.deleteVehiclesById);

export const vehiclesRoutes = router;
