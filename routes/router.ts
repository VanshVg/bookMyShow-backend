import express, { Router } from "express";

import authRoutes from "./authRouter";
import { applyPassportStrategy } from "../middlewares/passport";

applyPassportStrategy();

const router: Router = express.Router();

router.use("/auth", authRoutes);

export default router;
