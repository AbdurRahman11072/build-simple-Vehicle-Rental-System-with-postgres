import { Router } from "express";
import { authConroller } from "./auth.controller";

const router = Router();

router.post("/signup", authConroller.createUser);

export const authRoutes = router;
