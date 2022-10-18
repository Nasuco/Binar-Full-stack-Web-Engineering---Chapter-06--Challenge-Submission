const userRepository = require('../repositories/users');

module.exports = {
    create(requestBody) {
        return userRepository.create(requestBody);
    },

    findOne(id) {
        return userRepository.findOne(id);
    },

    findByPk(id) {
        return userRepository.findByPk(id);
    },

    async getUsers() {
        try {
            const users = await userRepository.findAll();
            return {
                data: users,
            };
        } catch (err) {
            throw err;
        }
    },

    update(id, requestBody) {
        return userRepository.update(id, requestBody);
    },

    delete(id) {
        return userRepository.delete(id);
    }
}