'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('appointments', 'date');
    await queryInterface.removeColumn('appointments', 'time');

    await queryInterface.addColumn('appointments', 'availability_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'availability',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('appointments', 'date');
    await queryInterface.addColumn('appointments', 'time');

    await queryInterface.removeColumn('appointments', 'availability_id');
  }
};
