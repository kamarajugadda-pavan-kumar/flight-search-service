"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
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

  down: async (queryInterface, Sequelize) => {
    // 1. Revert departureAirportId to reference id
    await queryInterface.changeColumn("Flights", "departureAirportId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Airports",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    // 2. Revert arrivalAirportId to reference id
    await queryInterface.changeColumn("Flights", "arrivalAirportId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Airports",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  },
};
