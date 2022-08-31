'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      /*
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Like);
      models.User.hasMany(models.Comment);
      */
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    imageProfile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};