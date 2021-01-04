"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      deadline: DataTypes.DATEONLY,
      groupId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {}
  );
  Project.associate = function (models) {
    Project.belongsTo(models.Category, { foreignKey: "categoryId" });
    Project.belongsTo(models.Group, { foreignKey: "groupId" });
    Project.hasMany(models.Task, { foreignKey: "projectId" });
  };
  return Project;
};
