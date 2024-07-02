import { Request, Response } from "express";
import { Op } from "sequelize";

import db from "../config/dbConnect";
import { sendResponse } from "../helpers/response";
import { EventAttributes, UsersAttributes } from "../interfaces/modelInterface";
import Event from "../database/models/Event";
import User from "../database/models/User";

const eventModel = db.Event;
const userModel = db.User;

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

    const userId: number = (req.user as UsersAttributes).id;
    const user: User | null = await userModel.findOne({ where: { id: userId } });

    await user?.$add("events", createEvent);

    return sendResponse(res, "", "Event added successfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const findUserEvent: UsersAttributes[] = await userModel.findAll({
      where: { [Op.and]: [{ id: userId }, { deletedAt: null }] },
      include: {
        association: "events",
      },
    });

    return sendResponse(res, findUserEvent, "User Event data fetched successfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const addOrganizers = async (req: Request, res: Response) => {
  try {
    const { users } = req.body;
    const { eventId } = req.params;
    const findUsers: User[] = await userModel.findAll({
      where: { [Op.and]: [{ id: users }, { role: "organizer" }, { deletedAt: null }] },
    });

    const event: Event | null = await eventModel.findOne({ where: { id: eventId } });
    if (event === null) {
      return sendResponse(res, "", "Something went wrong", "server", 500);
    }
    await event.$add("users", findUsers);

    return sendResponse(res, "", "Organizers added successfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events: Event[] = await eventModel.findAll({
      where: { [Op.and]: [{ start_time: { [Op.gt]: new Date() } }, { deletedAt: null }] },
    });

    return sendResponse(res, events, "Event data fetched successfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const getOneEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const event: Event | null = await eventModel.findOne({
      where: { [Op.and]: [{ id: eventId }, { deletedAt: null }] },
      include: {
        association: "users",
      },
    });
    if (event === null) {
      return sendResponse(res, "", "Event not found", "not_found", 404);
    }
    return sendResponse(res, event, "Event data fetched successfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const getEventsByType = async (req: Request, res: Response) => {
  try {
    const { typeId } = req.params;

    const events: Event[] = await eventModel.findAll({
      where: {
        [Op.and]: [
          { type_id: typeId },
          { deletedAt: null },
          { start_time: { [Op.gt]: new Date() } },
        ],
      },
    });

    return sendResponse(res, events, "Event data fetched successfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { name, description, type_id, address, start_time, end_time }: EventAttributes = req.body;

    await eventModel.update(
      {
        name: name,
        description: description,
        type_id: type_id,
        address: address,
        start_time: start_time,
        end_time: end_time,
      },
      { where: { [Op.and]: [{ id: eventId }, { deletedAt: null }] } }
    );

    return sendResponse(res, "", "Event updated succesfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};

export const removeEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    await eventModel.update(
      { deletedAt: new Date() },
      { where: { [Op.and]: [{ id: eventId }, { deletedAt: null }] } }
    );

    return sendResponse(res, "", "Event removed succesfully", "success", 200);
  } catch (error) {
    return sendResponse(res, "", "Something went wrong", "server", 500);
  }
};
