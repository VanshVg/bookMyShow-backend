require("ts-node/register");

const database = require("./database");

module.exports = {
  username: database.default.development.username,
  password: database.default.development.password,
  database: database.default.development.database,
  host: database.default.development.host,
  dialect: database.default.development.dialect,
};
