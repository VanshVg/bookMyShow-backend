"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      "user_events",
      [
        {
          organizer_id: 1,
          event_id: 1,
        },
        {
          organizer_id: 1,
          event_id: 2,
        },
        {
          organizer_id: 3,
          event_id: 3,
        },
        {
          organizer_id: 6,
          event_id: 4,
        },
        {
          organizer_id: 3,
          event_id: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("user_events", {});
  },
};
