import { NextFunction, Request, Response } from "express";
import { UsersAttributes } from "../interfaces/modelInterface";
import { sendResponse } from "../helpers/response";

export const checkRole =
  (requiredRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user: UsersAttributes = req.user as UsersAttributes;
    if (!(req.user && requiredRoles.includes(user.role))) {
      return sendResponse(res, "", "Access Denied", "unauthorised", 403);
    }
    return next();
  };
