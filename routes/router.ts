import express, { Router } from "express";

import authRoutes from "./authRouter";
import eventRoutes from "./eventRouter";
import { applyPassportStrategy } from "../middlewares/passport";

applyPassportStrategy();

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/event", eventRoutes);

export default router;
