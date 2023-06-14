'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fakeModule = require('@faker-js/faker');

const getRandomComment = size => {
  const entity = [];

  for (let i = 0; i <= size; i++) {
    entity.push({
      message: fakeModule.faker.person.fullName(),
      user_id: fakeModule.faker.person.lastName(),
      topic_id: fakeModule.faker.random.numeric(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return entity;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          message: 'message 2.1',
          user_id: 2,
          comment_id: null,
          created_at: new Date(),
          updated_at: new Date(),
          topic_id: 2,
        },
        {
          message: 'message 2',
          comment_id: null,
          created_at: new Date(),
          updated_at: new Date(),
          topic_id: 5,
          user_id: 2,
        },
        {
          message: 'message 2.1',
          user_id: 2,
          comment_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          topic_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  },
};
