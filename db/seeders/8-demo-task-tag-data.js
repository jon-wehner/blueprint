"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "TaskTags",
      [
        {
          taskId: 1,
          tagId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 1,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 2,
          tagId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 2,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 3,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 3,
          tagId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 4,
          tagId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 4,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 5,
          tagId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 5,
          tagId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 6,
          tagId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 6,
          tagId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 7,
          tagId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 8,
          tagId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 9,
          tagId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          taskId: 10,
          tagId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TaskTags", null, {});
  },
};
