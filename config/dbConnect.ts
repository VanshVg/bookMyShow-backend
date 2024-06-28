import { config } from "dotenv";
import { Sequelize } from "sequelize-typescript";

import User from "../database/models/User";
import Event from "../database/models/Event";
import UserEvent from "../database/models/UserEvent";
import EventTypes from "../database/models/EventType";
import EventSection from "../database/models/EventSections";
import Movie from "../database/models/Movie";
import Theatre from "../database/models/Theatre";
import TheatreMovie from "../database/models/TheatreMovie";

config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;
const dbHost = process.env.DB_HOST as string;
const dbDialect = "mysql";

const sequelize: Sequelize = new Sequelize({
  database: dbName,
  dialect: dbDialect,
  username: dbUser,
  password: dbPass,
  host: dbHost,
  storage: ":memory:",
  logging: false,
});

const models = {
  User,
  Event,
  UserEvent,
  EventTypes,
  EventSection,
  Movie,
  Theatre,
  TheatreMovie,
};

sequelize.addModels(Object.values(models));

const db = { sequelize, ...models };

export default db;
