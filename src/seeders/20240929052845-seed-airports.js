"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Airports", [
      {
        name: "Indira Gandhi International Airport",
        code: "DEL",
        address: "New Delhi",
        cityId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chhatrapati Shivaji Maharaj International Airport",
        code: "BOM",
        address: "Mumbai",
        cityId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kempegowda International Airport",
        code: "BLR",
        address: "Bangalore",
        cityId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chennai International Airport",
        code: "MAA",
        address: "Chennai",
        cityId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Netaji Subhash Chandra Bose International Airport",
        code: "CCU",
        address: "Kolkata",
        cityId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rajiv Gandhi International Airport",
        code: "HYD",
        address: "Hyderabad",
        cityId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Airports", null, {});
  },
};
