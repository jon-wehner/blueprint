"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING.BINARY,
    },
    {}
  );
  User.associate = function (models) {
    const userGroupMap = {
      foreignKey: "userId",
      through: models.UserGroup,
      otherKey: "groupId",
    };

    User.belongsToMany(models.Group, userGroupMap);
  };
  return User;
};
