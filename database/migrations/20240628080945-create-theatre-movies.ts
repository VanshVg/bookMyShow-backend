"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("theatre_movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      theatre_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "theatres",
          key: "id",
        },
      },
      movie_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "movies",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("theatre_movies");
  },
};
