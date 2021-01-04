"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Tag.associate = function (models) {
    const tagTaskMap = {
      foreignKey: "tagId",
      through: models.TaskTag,
      otherKey: "taskId",
    };
    Tag.belongsToMany(models.Task, tagTaskMap);
  };
  return Tag;
};
