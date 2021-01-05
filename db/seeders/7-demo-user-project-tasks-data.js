"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Tasks",
      [
        {
          name: "Choose app to clone",
          deadline: "2021-1-11",
          importance: "High",
          isComplete: true,
          projectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Create a Database Schema",
          deadline: "2021-1-11",
          importance: "High",
          isComplete: true,
          projectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Write User Stories",
          deadline: "2021-1-11",
          importance: "High",
          isComplete: true,
          projectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Write Feature List",
          deadline: "2021-1-11",
          importance: "Medium",
          isComplete: true,
          projectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Code the Application",
          deadline: "2021-1-11",
          importance: "High",
          isComplete: false,
          projectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Profit!",
          deadline: "2021-1-11",
          importance: "Low",
          isComplete: false,
          projectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Learn to cook byte salad",
          deadline: "2021-1-11",
          importance: "Low",
          isComplete: false,
          projectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Journal my thoughts",
          deadline: "2021-1-11",
          importance: "Low",
          isComplete: false,
          projectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Spread #Linux",
          deadline: "2021-1-11",
          importance: "High",
          isComplete: true,
          projectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Contribute to Open Source",
          deadline: "2021-1-11",
          importance: "High",
          isComplete: true,
          projectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tasks", null, {});
  },
};
