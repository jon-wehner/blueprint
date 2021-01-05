"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories",
      [
        { name: "Software", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Home Improvement",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Homework", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Personal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Self Improvement",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
