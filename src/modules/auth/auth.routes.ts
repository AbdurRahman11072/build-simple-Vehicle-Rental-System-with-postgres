import { Router } from "express";
import { authConroller } from "./auth.controller";
import { initDB } from "../../db/db";

const router = Router();
initDB();
router.post("/signup", authConroller.singup);
router.post("/signin", authConroller.signin);

export const authRoutes = router;
