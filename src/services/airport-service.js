const { AirportRepository } = require("../repositories");

const getAirport = async (id) => {
  const airport = await new AirportRepository().getAirport(id);
  return airport;
};

const updateAirport = async (data) => {
  const updatedAirport = await new AirportRepository().updateAirport(data);
  return updatedAirport;
};

const deleteAirport = async (id) => {
  const deletedAirport = await new AirportRepository().deleteAirport(id);
  return deletedAirport;
};

const createAirport = async (data) => {
  const createdAirport = await new AirportRepository().createAirport(data);
  return createdAirport;
};

module.exports = {
  getAirport,
  updateAirport,
  deleteAirport,
  createAirport,
};
