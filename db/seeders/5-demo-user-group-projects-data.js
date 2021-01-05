"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Projects",
      [
        {
          name: "Personal",
          description: "My personal project",
          deadline: "2021-2-1",
          groupId: 1,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BluePrint App",
          description: "Express Group Project",
          deadline: "2021-1-11",
          groupId: 1,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Projects", null, {});
  },
};
