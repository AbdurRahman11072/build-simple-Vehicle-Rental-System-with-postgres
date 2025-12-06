import { Router } from "express";
import { authConroller } from "./auth.controller";

const router = Router();

router.post("/signup", authConroller.singup);
router.post("/signin", authConroller.signin);

export const authRoutes = router;
