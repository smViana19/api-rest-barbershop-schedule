'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
