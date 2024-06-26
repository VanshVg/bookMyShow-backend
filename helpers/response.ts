import { Response } from "express";

export const sendResponse = (
  res: Response,
  data: any = [],
  message: string = "",
  type: string = "",
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    type: type,
    message: message,
    data: data,
  });
};
