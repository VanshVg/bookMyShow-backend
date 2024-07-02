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
          name: "World Cup 2026: India vs Pakistan",
          description: "Watch asia's greatest rivalry from stadium.",
          address: "Narendra Modi Stadium",
          type_id: 3,
          start_time: new Date("October 21, 2026 20:00:00"),
          end_time: new Date("October 21, 2026 23:30:00"),
        },
        {
          name: "World Cup 2026: India vs Australa",
          description: "Watch two most successful teams in cricket history from stadium.",
          address: "Narendra Modi Stadium",
          type_id: 3,
          start_time: new Date("November 10, 2026 20:00:00"),
          end_time: new Date("November 10, 2026 23:30:00"),
        },
        {
          name: "The Bassi Show",
          description: "Have a laughter show with Bassi",
          address: "Sun burn park",
          type_id: 1,
          start_time: new Date("May 5, 2024 18:30:00"),
          end_time: new Date("May 5, 2024 20:30:00"),
        },
        {
          name: "Coldplay Concert",
          description: "Join us to have a music blast with Coldplay",
          address: "Salt Lake Stadium",
          type_id: 2,
          start_time: new Date("September 3, 2024 18:30:00"),
          end_time: new Date("September 3, 2024 21:30:00"),
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
