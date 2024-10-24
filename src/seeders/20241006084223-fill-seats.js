"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seats = [];

    // Define seat distribution for different airplane types
    const airplanes = [
      { id: 5, name: "Airbus A320", capacity: 10 }, // Updated capacity
      { id: 6, name: "Boeing 737", capacity: 12 }, // Updated capacity
      { id: 7, name: "Airbus A321", capacity: 15 }, // Updated capacity
    ];

    // Logic to distribute seats (business, economy, etc.)
    airplanes.forEach((airplane) => {
      const businessClassRows = Math.floor(airplane.capacity * 0.1); // 10% business
      const premiumEconomyRows = Math.floor(airplane.capacity * 0.1); // 10% premium-economy
      const firstClassRows = Math.floor(airplane.capacity * 0.05); // 5% first-class
      const economyRows =
        airplane.capacity -
        (businessClassRows + premiumEconomyRows + firstClassRows);

      let row = 1;
      for (let i = 0; i < businessClassRows; i++) {
        for (let col = 1; col <= 3; col++) {
          seats.push({
            row,
            col: String.fromCharCode(64 + col), // Converts 1 -> A, 2 -> B, etc.
            airplaneId: airplane.id,
            type: "business",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        row++;
      }

      for (let i = 0; i < premiumEconomyRows; i++) {
        for (let col = 1; col <= 3; col++) {
          seats.push({
            row,
            col: String.fromCharCode(64 + col),
            airplaneId: airplane.id,
            type: "premium-economy",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        row++;
      }

      for (let i = 0; i < firstClassRows; i++) {
        for (let col = 1; col <= 3; col++) {
          // first-class typically has fewer seats per row
          seats.push({
            row,
            col: String.fromCharCode(64 + col),
            airplaneId: airplane.id,
            type: "first-class",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        row++;
      }

      for (let i = 0; i < economyRows; i++) {
        for (let col = 1; col <= 3; col++) {
          seats.push({
            row,
            col: String.fromCharCode(64 + col),
            airplaneId: airplane.id,
            type: "economy",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        row++;
      }
    });

    // Insert seats into the database
    await queryInterface.bulkInsert("Seats", seats, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Seats", null, {});
  },
};
