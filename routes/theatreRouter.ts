import express, { Router } from "express";
import passport from "passport";

import { checkRole } from "../middlewares/checkRoles";
import * as theatreController from "../controllers/theatreControllers";

const auth = passport.authenticate("jwt", { session: false, failureRedirect: "/" });

const router: Router = express.Router();

router.post("/add", auth, checkRole(["admin"]), theatreController.addTheatre);

export default router;
