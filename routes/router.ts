import express, { Router } from "express";

import { applyPassportStrategy } from "../middlewares/passport";
import authRoutes from "./authRouter";
import eventRoutes from "./eventRouter";
import theatreRoutes from "./theatreRouter";

applyPassportStrategy();

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/event", eventRoutes);
router.use("/theatre", theatreRoutes);

export default router;
