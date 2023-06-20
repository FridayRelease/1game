'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reactions_type', [
      {
        name: 'smile',
        emoji: '0x1F602'
      },
      {
        name: 'angry',
        emoji: '0x1F608'
      },
      {
        name: 'screaming',
        emoji: '0x1F631'
      },
      {
        name: 'questions',
        emoji: '0xDE09'
      },
      {
        name: 'like',
        emoji: '0x2764'
      },
      {
        name: 'magic',
        emoji: '0x2728'
      },
      {
        name: 'clown',
        emoji: '0x1F921'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reactions_type', {
      cascade: true
    });
  }
};
