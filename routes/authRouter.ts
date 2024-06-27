import express, { Router } from "express";

import * as authController from "../controllers/authControllers";
import {
  loginValidator,
  registerValidator,
  resetPasswordValidator,
  verifyAccountValidator,
} from "../validators/authValidators";

const router: Router = express.Router();

router.post("/register", registerValidator, authController.register);
router.put("/activate/:token", authController.activateAccount);
router.post("/login", loginValidator, authController.login);
router.put("/verify", verifyAccountValidator, authController.verifyAccount);
router.get("/verifyResetToken/:token", authController.verifyResetToken);
router.put("/resetPassword/:token", resetPasswordValidator, authController.resetPassword);

export default router;
