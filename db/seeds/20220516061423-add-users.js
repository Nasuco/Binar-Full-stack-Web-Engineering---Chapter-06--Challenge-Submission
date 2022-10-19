'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Users',
      [
        {
          name: "Kelompok5",
          email: "kel5@gmail.com",
          password: "$2a$10$yfuYDcu53OQ1pq6GZitA9OK2lXpuAZzRaugQb7vgX0XLi03JQibCO",
          role: "superadmin",
          createdAt: "2022-10-19T16:31:35.465Z",
          updatedAt: "2022-10-19T16:31:35.465Z"
        }
      ]
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};