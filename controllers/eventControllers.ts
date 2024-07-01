import { Request, Response } from "express";

import db from "../config/dbConnect";
import { sendResponse } from "../helpers/response";
import { EventAttributes } from "../interfaces/modelInterface";
import Event from "../database/models/Event";

const eventModel = db.Event;

export const addEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, type_id, address, start_time, end_time }: EventAttributes = req.body;

    const createEvent: Event = await eventModel.create({
      name: name,
      description: description,
      type_id: type_id,
      address: address,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
    });
    if (!createEvent.dataValues.id) {
      return sendResponse(res, "", "Something went wrong", "server", 500);
    }

    return sendResponse(res, "", "Event added successfully", "success", 200);
  } catch (error) {
    console.log(error);
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};
