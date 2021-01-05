"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      name: DataTypes.STRING,
      deadline: DataTypes.DATEONLY,
      importance: DataTypes.STRING,
      isComplete: DataTypes.BOOLEAN,
      projectId: DataTypes.INTEGER,
    },
    {}
  );
  Task.associate = function (models) {
    const taskTagMap = {
      foreignKey: "taskId",
      through: "TaskTag",
      otherKey: "tagId",
    };
    Task.belongsToMany(models.Tag, taskTagMap);
    Task.belongsTo(models.Project, { foreignKey: "projectId" });
  };
  return Task;
};
