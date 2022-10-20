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
    await queryInterface.bulkInsert('Cars',
      [{
          name: "BMW X6",
          type: "Coupe",
          size: "Small",
          price: 300000000,
          image: "car01.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Porsche 911",
          type: "Sports Car",
          size: "Small",
          price: 700000000,
          image: "car02.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Subaru Outback",
          type: "Station Wagon",
          size: "Large",
          price: 350000000,
          image: "car03.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ford Mustang",
          type: "Coupe",
          size: "Large",
          price: 450000000,
          image: "car04.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Volvo",
          type: "Micro Car",
          size: "Medium",
          price: 150000000,
          image: "car05.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
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