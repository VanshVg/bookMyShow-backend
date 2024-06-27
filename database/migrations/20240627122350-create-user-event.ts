"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("user_events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      organizer_id: {
        type: Sequelize.NUMBER,
        references: {
          model: "users",
          key: "id",
        },
      },
      event_id: {
        type: Sequelize.NUMBER,
        references: {
          model: "events",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("user_events");
  },
};
