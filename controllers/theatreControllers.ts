import { Request, Response } from "express";
import { sendResponse } from "../helpers/response";

export const addTheatre = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};
