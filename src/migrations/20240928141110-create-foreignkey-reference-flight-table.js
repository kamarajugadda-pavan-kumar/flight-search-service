"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Change departureAirportId to reference code instead of id
    await queryInterface.changeColumn("Flights", "departureAirportId", {
      type: Sequelize.STRING, // Match the type of 'code' from Airports
      allowNull: false,
      references: {
        model: "Airports",
        key: "code",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    // Change arrivalAirportId to reference code instead of id
    await queryInterface.changeColumn("Flights", "arrivalAirportId", {
      type: Sequelize.STRING, // Match the type of 'code' from Airports
      allowNull: false,
      references: {
        model: "Airports",
        key: "code",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Change departureAirportId to reference code instead of id
    await queryInterface.changeColumn("Flights", "departureAirportId", {
      type: Sequelize.STRING, // Match the type of 'code' from Airports
      allowNull: false,
    });

    // Change arrivalAirportId to reference code instead of id
    await queryInterface.changeColumn("Flights", "arrivalAirportId", {
      type: Sequelize.STRING, // Match the type of 'code' from Airports
      allowNull: false,
    });
  },
};
