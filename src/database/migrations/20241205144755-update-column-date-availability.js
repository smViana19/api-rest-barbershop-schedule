'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('availability', 'date', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('availability', 'date', {
      type: Sequelize.DATE,
      allowNull: false
    })
  }
};
