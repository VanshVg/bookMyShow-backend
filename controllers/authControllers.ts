import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import argon2 from "argon2";
import randomstring from "randomstring";
import { Op } from "sequelize";

import { usersAttributes } from "../interfaces/modelInterface";
import db from "../config/dbConnect";
import { sendResponse } from "../helpers/response";
import User from "../database/models/User";
import { generateToken } from "../helpers/generateToken";

const userModel = db.User;

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, "", "Invalid payload", "payload", 400);
    }

    const { first_name, last_name, email_id, contact_no, password }: usersAttributes = req.body;

    const isEmail: User | null = await userModel.findOne({
      where: { email_id: email_id },
      raw: true,
    });
    if (isEmail !== null) {
      const createdDate: Date = isEmail.createdAt;
      const currentTime: Date = new Date();
      const expireTime: number = (currentTime.valueOf() - createdDate.valueOf()) / (1000 * 60 * 60);
      if (expireTime > 1) {
        await userModel.update({ deletedAt: new Date() }, { where: { email_id: email_id } });
      }

      if (
        (isEmail.is_active && isEmail.deletedAt === null) ||
        (!isEmail.is_active && expireTime < 1)
      ) {
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
      const expireTime: number = (currentTime.valueOf() - createdDate.valueOf()) / (1000 * 60 * 60);
      if (expireTime > 1) {
        await userModel.update({ deletedAt: new Date() }, { where: { contact_no: contact_no } });
      }
      if (
        (isContactNo.is_active && isContactNo.deletedAt === null) ||
        (!isContactNo.is_active && expireTime < 1)
      )
        return sendResponse(res, "", "Mobile number already exists", "contact_conflict", 409);
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

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, "", "Invalid payload", "payload", 400);
    }

    const { username, password }: { username: string; password: string } = req.body;

    const findUser: User | null = await userModel.findOne({
      where: { [Op.or]: [{ email_id: username }, { contact_no: username }] },
    });
    if (findUser === null) {
      return sendResponse(res, "", "Invalid Credentials", "unauthorised", 401);
    }
    if (!(await argon2.verify(findUser.password, password))) {
      return sendResponse(res, "", "Invalid Credentials", "unauthorised", 401);
    }

    if (!findUser.is_active) {
      return sendResponse(res, "", "Account isn't activated", "forbidden", 403);
    }

    const token: string = generateToken(
      findUser.first_name,
      findUser.last_name,
      findUser.email_id,
      findUser.contact_no
    );

    res.cookie("token", token, { maxAge: 1036800000, httpOnly: true });
    return sendResponse(res, "", "Login Successful", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const verifyAccount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, "", "Invalid payload", "payload", 400);
    }

    const { username }: { username: string } = req.body;

    const findUser = await userModel.findOne({
      where: { [Op.or]: [{ contact_no: username }, { email_id: username }] },
    });
    if (findUser === null) {
      return sendResponse(res, "", "Invalid Credentials", "unauthorised", 401);
    }

    if (!findUser.is_active) {
      return sendResponse(res, "", "Account isn't activated", "forbidden", 403);
    }

    const resetToken: string = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
    });

    await userModel.update(
      { reset_token: resetToken, reset_time: new Date() },
      { where: { id: findUser.id } }
    );

    return sendResponse(res, resetToken, "Account is verified", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};
