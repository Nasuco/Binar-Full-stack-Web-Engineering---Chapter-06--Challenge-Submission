'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {

        }
    }
    Users.init({
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Email address already in use!'
            },
            validate: {
                isLowercase: true,
                notEmpty: {
                    msg: 'Please input email'
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
                
            }
        }
    })
}