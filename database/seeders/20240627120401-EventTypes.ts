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
      "event_types",
      [
        {
          type: "Standup Comedy",
        },
        {
          type: "Music Concert",
        },
        {
          type: "Sports",
        },
        {
          type: "Drama",
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
    await queryInterface.bulkDelete("event_types", {});
  },
};

20240701082335;
