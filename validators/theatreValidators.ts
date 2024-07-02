import { ValidationChain, body } from "express-validator";

export const theatreDetailsValidator: ValidationChain[] = [
  body("name").trim().notEmpty().withMessage("Theatre name can't be empty."),
  body("address").trim().notEmpty().withMessage("Theatre address can't be empty."),
];
