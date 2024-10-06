"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const flights = [];

    // Fetch all airplanes and airports from the database
    const airplanes = await queryInterface.sequelize.query(
      `SELECT id FROM Airplanes;`
    );
    const airports = await queryInterface.sequelize.query(
      `SELECT code FROM Airports;`
    );

    // Extract airplane ids and airport codes
    const airplaneIds = airplanes[0].map((a) => a.id);
    const airportCodes = airports[0].map((a) => a.code);

    // Helper function to generate random departure and arrival times
    function generateRandomTime() {
      const departureTime = faker.date.future(); // Departure in future
      const arrivalTime = new Date(
        departureTime.getTime() + Math.random() * 3 * 60 * 60 * 1000
      ); // Arrival 1-3 hours after departure
      return { departureTime, arrivalTime };
    }

    for (let i = 0; i < 200; i++) {
      const { departureTime, arrivalTime } = generateRandomTime();

      // Ensure departure and arrival airports are different
      let departureAirport = faker.helpers.arrayElement(airportCodes);
      let arrivalAirport = faker.helpers.arrayElement(airportCodes);

      while (departureAirport === arrivalAirport) {
        arrivalAirport = faker.helpers.arrayElement(airportCodes); // Regenerate until different
      }

      // Push flight data into the flights array
      flights.push({
        flightNumber: faker.string.alphanumeric(6).toUpperCase(),
        airplaneId: faker.helpers.arrayElement(airplaneIds),
        departureAirportId: departureAirport,
        arrivalAirportId: arrivalAirport,
        arrivalTime: arrivalTime,
        departureTime: departureTime,
        price: faker.number.int({ min: 3000, max: 15000 }),
        boardingGate: faker.string.alphanumeric(3).toUpperCase(),
        totalSeats: faker.number.int({ min: 100, max: 300 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Bulk insert the generated flight data into the Flights table
    return queryInterface.bulkInsert("Flights", flights, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove the inserted flight data when reverting the seed
    return queryInterface.bulkDelete("Flights", null, {});
  },
};
