"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     */

    await queryInterface.bulkInsert(
      "events",
      [
        {
          name: "Culers",
          description: "This event is for all the culers around the world.",
          address: "la-masia",
          type_id: 2,
          start_time: new Date("January 22, 2024 14:30:00"),
          end_time: new Date("January 22, 2024 18:00:00"),
        },
        {
          name: "Fan Park",
          description: "This is fan park for the match of India vs Pakistan.",
          address: "Nadiad",
          type_id: 1,
          start_time: new Date("June 8, 2024 18:00:00"),
          end_time: new Date("June 8, 2024 23:45:00"),
        },
        {
          name: "Standup Comedy",
          description: "This is a Stand Comedy event.",
          address: "Signal Park",
          type_id: 3,
          start_time: new Date("May 5, 2024 18:30:00"),
          end_time: new Date("May 5, 2024 20:30:00"),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
