'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  UserGroup.associate = function(models) {
    // associations can be defined here
  };
  return UserGroup;
};