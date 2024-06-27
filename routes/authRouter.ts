import express, { Router } from "express";

import * as authController from "../controllers/authControllers";
import { registerValidator } from "../validators/authValidators";

const router: Router = express.Router();

router.post("/register", registerValidator, authController.register);
router.put("/activate/:token", authController.activateAccount);

export default router;
