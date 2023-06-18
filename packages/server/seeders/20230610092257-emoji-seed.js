'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reactions_type', [
      {
        name: 'smile',
        emoji: '&#128515'
      },
      {
        name: 'angry',
        emoji: '&#128515'
      },
      {
        name: 'questions',
        emoji: '&#128515'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reactions_type', {
      cascade: true
    });
  }
};
