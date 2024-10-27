"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Airplanes", [
      {
        name: "Airbus A320",
        capacity: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Boeing 737",
        capacity: 160,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Airbus A321",
        capacity: 190,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Airplanes", null, {});
  },
};
