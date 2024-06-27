"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          first_name: "Vansh",
          last_name: "Gandhi",
          email_id: "vansh.vg18@gmail.com",
          contact_no: 9909530136,
          password: "Vansh@123",
          is_active: 1,
          verification_token: "Token1",
          role: "admin",
        },
        {
          first_name: "Lionel",
          last_name: "Messi",
          email_id: "lm10@gmail.com",
          contact_no: 9281728201,
          password: "Messi@123",
          is_active: 1,
          verification_token: "Token2",
          role: "admin",
        },
        {
          first_name: "Pedri",
          last_name: "Gonzalez",
          email_id: "Pedri8@gmail.com",
          contact_no: 9281728202,
          password: "Pedri@123",
          is_active: 1,
          verification_token: "Token3",
          role: "organizer",
        },
        {
          first_name: "Lamine",
          last_name: "Yamal",
          email_id: "Lamine@gmail.com",
          contact_no: 9281728216,
          password: "Lamine@123",
          is_active: 1,
          verification_token: "Token4",
          role: "user",
        },
        {
          first_name: "Pablo",
          last_name: "Gavi",
          email_id: "gavi@gmail.com",
          contact_no: 9281728233,
          password: "Gavi@123",
          is_active: 1,
          verification_token: "Token5",
          role: "organizer",
        },
        {
          first_name: "Pau",
          last_name: "Cubarasi",
          email_id: "cubarasi@gmail.com",
          contact_no: 9281777233,
          password: "Cubarasi@123",
          is_active: 1,
          verification_token: "Token5",
          role: "user",
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("Users", {});
  },
};
