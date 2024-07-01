import express, { Router } from "express";

import * as eventController from "../controllers/eventControllers";
import { addEventValidator } from "../validators/eventValidators";
import passport from "passport";

const router: Router = express.Router();

router.post(
  "/add",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  addEventValidator,
  eventController.addEvent
);

export default router;
