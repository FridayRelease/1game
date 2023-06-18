'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fakeModule = require('@faker-js/faker/locale/ru');

const getRandomTopic = size => {
  const entity = [];

  for (let i = 0; i <= size; i++) {
    entity.push({
      subject: fakeModule.faker.lorem.paragraph({ min: 1, max: 2 }),
      user_id: fakeModule.faker.number.int({ min: 1, max: 30 }),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return entity;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('topics', getRandomTopic(30), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('topics', {
      cascade: true
    });
  },
};
