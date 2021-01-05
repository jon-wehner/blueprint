"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Tags",
      [
        { name: "Documentation", createdAt: new Date(), updatedAt: new Date() },
        { name: "Planning", createdAt: new Date(), updatedAt: new Date() },
        { name: "Main Feature", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Secondary Feature",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Bonus Feature", createdAt: new Date(), updatedAt: new Date() },
        { name: "Action Item", createdAt: new Date(), updatedAt: new Date() },
        { name: "Challenge", createdAt: new Date(), updatedAt: new Date() },
        { name: "Milestone", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tags", null, {});
  },
};
