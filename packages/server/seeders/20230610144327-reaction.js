'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reactions', [{}], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reactions', {
      cascade: true,
    });
  }
};
