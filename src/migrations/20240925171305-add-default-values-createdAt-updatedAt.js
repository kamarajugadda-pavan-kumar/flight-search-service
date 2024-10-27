"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Set default values for createdAt and updatedAt in the Cities table
    await queryInterface.changeColumn("Cities", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Default to current timestamp
    });

    await queryInterface.changeColumn("Cities", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Default to current timestamp
    });

    // Set default values for createdAt and updatedAt in the Airplanes table
    await queryInterface.changeColumn("Airplanes", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Default to current timestamp
    });

    await queryInterface.changeColumn("Airplanes", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Default to current timestamp
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the default values for Cities table
    await queryInterface.changeColumn("Cities", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("Cities", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    // Revert the default values for Airplanes table
    await queryInterface.changeColumn("Airplanes", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("Airplanes", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
