"use strict";
module.exports = (sequelize, DataTypes) => {
  const TaskTag = sequelize.define(
    "TaskTag",
    {
      taskId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {}
  );
  TaskTag.associate = function (models) {
    // associations can be defined here
  };
  return TaskTag;
};
