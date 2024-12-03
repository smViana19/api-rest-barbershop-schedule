'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('appointments', 'professional_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'professionals',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addColumn('appointments', 'service_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('appointments', 'professional_id');
    await queryInterface.removeColumn('appointments', 'service_id');
  },
};
