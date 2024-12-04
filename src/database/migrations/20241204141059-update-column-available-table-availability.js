'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('availability', 'isAvailable', 'is_available');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('availability', 'is_available', 'isAvailable');
  }
};
