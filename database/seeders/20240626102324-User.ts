"use strict";

import { QueryInterface } from "sequelize";

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
          password:
            "$argon2id$v=19$m=65536,t=3,p=4$HoxkEuZbXohEFuPamcByKg$URxxZ/gwQd8AtOwiibgr7bSAONCi9NHIHk3LiHppIkk",
          is_active: 1,
          verification_token: "Token1",
          role: "admin",
        },
        {
          first_name: "Lionel",
          last_name: "Messi",
          email_id: "lm10@gmail.com",
          contact_no: 9281728201,
          password:
            "$argon2id$v=19$m=65536,t=3,p=4$0TD8l5GF74w0wmXxXokhcQ$Mx+uUC5vZfNb6oP0+vvlBoch81Y9KKqodSa++oi5yJc",
          is_active: 1,
          verification_token: "Token2",
          role: "admin",
        },
        {
          first_name: "Pedri",
          last_name: "Gonzalez",
          email_id: "Pedri8@gmail.com",
          contact_no: 9281728202,
          password:
            "$argon2id$v=19$m=65536,t=3,p=4$xaudNiExKYvrco5xodityQ$lYU6u0pDA+T4TFf9UqOyxav0Nayfo5ZyQhmx2eia3+w",
          is_active: 1,
          verification_token: "Token3",
          role: "organizer",
        },
        {
          first_name: "Lamine",
          last_name: "Yamal",
          email_id: "Lamine@gmail.com",
          contact_no: 9281728216,
          password:
            "$argon2id$v=19$m=65536,t=3,p=4$vbBbKbYT15paos5QxhPnig$1EfQVlsyN5iEbp5Wf0rQzRAP8jYxVQ3M9orni4816zI",
          is_active: 1,
          verification_token: "Token4",
          role: "user",
        },
        {
          first_name: "Pablo",
          last_name: "Gavi",
          email_id: "gavi@gmail.com",
          contact_no: 9281728233,
          password:
            "$argon2id$v=19$m=65536,t=3,p=4$wvtkb92wIfkrqr0LTsMC4g$Pd4d1GBgY896j7J1FT7XqjPrYldUFZrZZ4D92X/5YOQ",
          is_active: 1,
          verification_token: "Token5",
          role: "organizer",
        },
        {
          first_name: "Pau",
          last_name: "Cubarasi",
          email_id: "cubarasi@gmail.com",
          contact_no: 9281777233,
          password:
            "$argon2id$v=19$m=65536,t=3,p=4$Yb6Ey5hy4MVnazdQi0CXPA$eOBZFpFsbji6SzDqqkigu0hpevq/3fiy5Ri6CcDdSr0",
          is_active: 1,
          verification_token: "Token5",
          role: "user",
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Users", {});
  },
};
