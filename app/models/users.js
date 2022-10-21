'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email is already exist"
      },
      validate: {
        isLowercase: true,
        notEmpty: {
          msg: "Please input your email"
        },
        isEmail: {
          msg: 'Email is invalid'
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    validate: {
      userValidation() {
        if(this.name.length < 5) {
          throw new Error("First Name length must be 5 or greater!")
        }
      }
    }
  });
  return Users;
};