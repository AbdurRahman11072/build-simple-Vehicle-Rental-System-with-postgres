import { Router } from "express";
import { vehicalesController } from "./vehicles.controller";

import { auth } from "../../middleware/auth";

const router = Router();

router.get("/", auth(["admin"]), vehicalesController.getAllVehicles);
router.get("/:vehicleId", vehicalesController.getVehiclesById);
router.post("/", auth(["admin"]), vehicalesController.createVehicles);
router.delete(
  "/:vehicleId",
  auth(["admin"]),
  vehicalesController.deleteVehiclesById
);
router.put(
  "/:vehicleId",
  auth(["admin"]),
  vehicalesController.updateVehiclesById
);

export const vehiclesRoutes = router;
