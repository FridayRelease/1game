'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fakeModule = require('@faker-js/faker/locale/ru');

const getRandomUser = size => {
  const entity = [];

  for (let i = 0; i <= size; i++) {
    entity.push({
      first_name: fakeModule.faker.person.fullName(),
      second_name: fakeModule.faker.person.lastName(),
      email: fakeModule.faker.internet.email(),
      display_name: fakeModule.faker.person.middleName(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return entity;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', getRandomUser(30), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users', {
      cascade: true
    });
  },
};
