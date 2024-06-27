import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import argon2 from "argon2";
import randomstring from "randomstring";
import { Op } from "sequelize";

import { usersAttributes } from "../interfaces/modelInterface";
import db from "../config/dbConnect";
import { sendResponse } from "../helpers/response";
import User from "../database/models/User";

const userModel = db.User;

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, type: "payload", message: "Invalid payload" });
    }

    const { first_name, last_name, email_id, contact_no, password }: usersAttributes = req.body;

    const isEmail: User | null = await userModel.findOne({
      where: { email_id: email_id },
      raw: true,
    });
    if (isEmail !== null) {
      const createdDate: Date = isEmail.createdAt;
      const currentTime: Date = new Date();
      if ((currentTime.valueOf() - createdDate.valueOf()) / (1000 * 60 * 60) > 1) {
        await userModel.update({ deletedAt: new Date() }, { where: { email_id: email_id } });
      }
      if (isEmail.is_active && isEmail.deletedAt === null) {
        return sendResponse(res, "", "Email id already exists", "email_conflict", 409);
      }
    }

    const isContactNo: User | null = await userModel.findOne({
      where: { contact_no: contact_no },
      raw: true,
    });
    if (isContactNo !== null) {
      const createdDate: Date = isContactNo.createdAt;
      const currentTime: Date = new Date();
      if ((currentTime.valueOf() - createdDate.valueOf()) / (1000 * 60 * 60) > 1) {
        await userModel.update({ deletedAt: new Date() }, { where: { contact_no: contact_no } });
      }
      if (isContactNo.is_active && isContactNo.deletedAt === null) {
        return sendResponse(res, "", "Mobile number already exists", "contact_conflict", 409);
      }
    }

    const hashedPassword: string = await argon2.hash(password);
    const verificationToken: string = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
    });

    const createUser: User = await userModel.create({
      first_name: first_name,
      last_name: last_name,
      email_id: email_id,
      contact_no: contact_no,
      password: hashedPassword,
      is_active: false,
      verification_token: verificationToken,
    });
    if (!createUser.dataValues.id) {
      return sendResponse(res, "", "Something went wrong", "server", 500);
    }

    return sendResponse(res, verificationToken, "Register Successful", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const activateAccount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token } = req.params;

    const isvalid: User | null = await userModel.findOne({
      where: {
        [Op.and]: [{ verification_token: token }, { deletedAt: null }],
      },
    });
    if (isvalid === null) {
      return sendResponse(res, "", "User isn't authorised to access this page", "forbidden", 403);
    }

    if (isvalid.is_active) {
      return sendResponse(res, "", "Account is already activated", "conflict", 409);
    }

    await userModel.update(
      { is_active: true },
      {
        where: {
          [Op.and]: [{ verification_token: token }, { deletedAt: null }],
        },
      }
    );

    return sendResponse(res, "", "Account activation successful", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};
