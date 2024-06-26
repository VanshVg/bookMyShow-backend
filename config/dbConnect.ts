import { config } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import User from "../database/models/User";

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
};
sequelize.addModels(Object.values(models));

const db = { sequelize, ...models };

export default db;
