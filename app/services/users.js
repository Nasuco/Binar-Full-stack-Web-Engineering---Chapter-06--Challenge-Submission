/**
 * @file contains entry point of controllers api module
 * @author Kelompok5
 */

const usersRepository = require("../repositories/users");

module.exports = {
  create(requestBody) {
    return usersRepository.create(requestBody);
  },

  findOne(id) {
    return usersRepository.findOne(id);
  },

  findByPk(id) {
    return usersRepository.findByPk(id);
  },

  async getUsers() {
    try {
      const users = await usersRepository.findAll();
      return {
        data: users,
      };
    } catch (err) {
      throw err;
    }
  },

  update(id, requestBody) {
    return usersRepository.update(id, requestBody);
  },

  delete(id) {
    return usersRepository.delete(id);
  },
}