import express, { Router } from "express";
import passport from "passport";

import { checkRole } from "../middlewares/checkRoles";
import * as theatreController from "../controllers/theatreControllers";
import { theatreDetailsValidator } from "../validators/theatreValidators";

const auth = passport.authenticate("jwt", { session: false, failureRedirect: "/" });

const router: Router = express.Router();

router.post(
  "/add",
  auth,
  checkRole(["admin"]),
  theatreDetailsValidator,
  theatreController.addTheatre
);
router.get("/getAll", auth, theatreController.getAllTheatres);
router.put(
  "/update/:theatreId",
  auth,
  checkRole(["admin"]),
  theatreDetailsValidator,
  theatreController.updateTheatre
);

export default router;
