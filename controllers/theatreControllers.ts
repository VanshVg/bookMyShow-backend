import { Request, Response } from "express";

import { sendResponse } from "../helpers/response";
import db from "../config/dbConnect";
import { Result, ValidationError, validationResult } from "express-validator";
import { Op } from "sequelize";

const theatreModel = db.Theatre;

export const addTheatre = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, "", "Invalid payload", "payload", 400);
    }

    const { name, address } = req.body;

    const createTheatre = await theatreModel.create({
      name: name,
      address: address,
    });
    if (!createTheatre.dataValues.id) {
      return sendResponse(res, "", "Something went wrong", "server", 500);
    }

    return sendResponse(res, "", "Theatre added successfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const getAllTheatres = async (req: Request, res: Response) => {
  try {
    const findAllTheatres = await theatreModel.findAll({ where: { deletedAt: null } });
    return sendResponse(res, findAllTheatres, "Theatre data fetched successfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const updateTheatre = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, "", "Invalid payload", "payload", 400);
    }

    const { theatreId } = req.params;
    const { name, address } = req.body;

    await theatreModel.update(
      { name: name, address: address },
      { where: { [Op.and]: [{ id: theatreId }, { deletedAt: null }] } }
    );
    return sendResponse(res, "", "Theatre updated successfully", "success", 200);
  } catch (error) {
    console.log(error);
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};
