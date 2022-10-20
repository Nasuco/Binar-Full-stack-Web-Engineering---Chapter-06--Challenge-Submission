/**
 * @file contains entry point of controllers api module
 * @author Kelompok5
 */

const {
  Users
} = require("../models");

module.exports = {
  create(registerArgs) {
    return Users.create(registerArgs);
  },

  findOne(id) {
    return Users.findOne(id);
  },

  findByPk(id) {
    return Users.findByPk(id);
  },

  findAll() {
    return Users.findAll()
  },

  update(id, updateArgs) {
    return Users.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Users.destroy({
      where: {
        id,
      },
    });
  }
}