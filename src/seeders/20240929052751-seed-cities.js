"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cities", [
      { name: "Delhi", createdAt: new Date(), updatedAt: new Date() },
      { name: "Mumbai", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bangalore", createdAt: new Date(), updatedAt: new Date() },
      { name: "Chennai", createdAt: new Date(), updatedAt: new Date() },
      { name: "Kolkata", createdAt: new Date(), updatedAt: new Date() },
      { name: "Hyderabad", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cities", null, {});
  },
};
