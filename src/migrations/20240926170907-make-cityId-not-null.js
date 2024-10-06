"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Airports", "cityId", {
      type: Sequelize.INTEGER,
      allowNull: false, // Make cityId NOT NULL
      references: {
        model: "Cities", // Assuming the 'Cities' table exists
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Airports", "cityId", {
      type: Sequelize.INTEGER,
      allowNull: true, // Revert cityId to allow NULL in case of rollback
      references: {
        model: "Cities",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
};
