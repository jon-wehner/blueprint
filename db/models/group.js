"use strict";
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Group.associate = function (models) {
    const groupUserMap = {
      foreignKey: "groupId",
      through: models.UserGroup,
      otherKey: "userId",
    };
    Group.belongsToMany(models.User, groupUserMap);
    Group.hasMany(models.Project, { foreignKey: "groupId" });
  };
  return Group;
};
