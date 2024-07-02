import express, { Router } from "express";

import * as eventController from "../controllers/eventControllers";
import { addEventValidator } from "../validators/eventValidators";
import passport from "passport";
import { checkRole } from "../middlewares/checkRoles";

const router: Router = express.Router();

const auth = passport.authenticate("jwt", { session: false, failureRedirect: "/" });

router.post(
  "/add",
  auth,
  checkRole(["admin", "organizer"]),
  addEventValidator,
  eventController.addEvent
);
router.get("/getUserEvent/:userId", auth, eventController.getUserEvents);
router.post(
  "/addOrganizers/:eventId",
  auth,
  checkRole(["admin", "organizer"]),
  eventController.addOrganizers
);
router.get("/getAll", auth, eventController.getAllEvents);
router.get("/getOne/:eventId", auth, eventController.getOneEvent);
router.get("/getAll/:typeId", auth, eventController.getEventsByType);
router.put(
  "/update/:eventId",
  auth,
  checkRole(["admin", "organizer"]),
  eventController.updateEvent
);
router.delete(
  "/remove/:eventId",
  auth,
  checkRole(["admin", "organizer"]),
  eventController.removeEvent
);

export default router;
