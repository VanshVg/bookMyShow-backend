import { ValidationChain, body } from "express-validator";

export const addEventValidator: ValidationChain[] = [
  body("name").trim().notEmpty().withMessage("Event name can't be empty."),
  body("description").trim().notEmpty().withMessage("Event description can't be empty."),
  body("type_id").trim().notEmpty().withMessage("Type_id can't be empty."),
  body("address").trim().notEmpty().withMessage("Address name can't be empty."),
  body("start_time").trim().notEmpty().withMessage("Event start_time can't be empty."),
  body("end_time").trim().notEmpty().withMessage("Event end_time can't be empty."),
];
