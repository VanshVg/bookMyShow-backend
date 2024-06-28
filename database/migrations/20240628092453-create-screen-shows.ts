"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("shows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      screen_id: {
        type: Sequelize.NUMBER,
        references: {
          model: "screens",
          key: "id",
        },
      },
      movie_id: {
        type: Sequelize.NUMBER,
        references: {
          model: "movies",
          key: "id",
        },
      },
      start_time: {
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("shows");
  },
};
