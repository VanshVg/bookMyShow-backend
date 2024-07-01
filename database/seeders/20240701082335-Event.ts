"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     */

    await queryInterface.bulkInsert(
      "events",
      [
        {
          name: "Arijit Concert",
          description: "Join to have music delight with Arijit Singh.",
          address: "Sunburn Park",
          type_id: 2,
          start_time: new Date("January 22, 2024 14:30:00"),
          end_time: new Date("January 22, 2024 18:00:00"),
        },
        {
          name: "India vs Australia ODI Wc Final",
          description: "Come and watch the biggest match of cricket. India vs Australia.",
          address: "Narendra Modi Stadium",
          type_id: 3,
          start_time: new Date("November 19, 2023 14:00:00"),
          end_time: new Date("November 19, 2023 22:00:00"),
        },
        {
          name: "The Bassi Show",
          description: "This is a Stand Comedy event.",
          address: "Sun burn park",
          type_id: 1,
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
     */
    await queryInterface.bulkDelete("events", {});
  },
};
