import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import argon2 from "argon2";
import randomstring from "randomstring";

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
        const deleteUser: [affectedRows: number] = await userModel.update(
          { deletedAt: new Date() },
          { where: { email_id: email_id } }
        );
        if (!deleteUser) {
          return sendResponse(res, "", "Something went wrong", "server", 500);
        }
      }
      if (isEmail.is_active && isEmail.deletedAt === null) {
        return sendResponse(res, "", "Email id already exists", "conflict", 409);
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
        const deleteUser: [affectedRows: number] = await userModel.update(
          { deletedAt: new Date() },
          { where: { contact_no: contact_no } }
        );
        if (!deleteUser) {
          return sendResponse(res, "", "Something went wrong", "server", 500);
        }
      }
      if (isContactNo.is_active && isContactNo.deletedAt === null) {
        return sendResponse(res, "", "Mobile number already exists", "conflict", 409);
      }
    }

    const hashedPassword: string = await argon2.hash(password);
    const verificationToken: string = randomstring.generate({
      length: 10,
      charset: "alphanumeric",
    });
    const token: string = generateToken(first_name, last_name, email_id, contact_no);

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

    res.cookie("token", token, { maxAge: 1036800000, httpOnly: true });
    return sendResponse(res, verificationToken, "Register Successful", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};
