const { AirplaneRepository } = require("../repositories");

const getAirplane = async (id) => {
  const airplane = await new AirplaneRepository().getAirplane(id);
  return airplane;
};

const updateAirplane = async (data) => {
  const updatedAirplane = await new AirplaneRepository().updateAirplane(data);
  return updatedAirplane;
};

const deleteAirplane = async (id) => {
  const deletedAirplane = await new AirplaneRepository().deleteAirplane(id);
  return deletedAirplane;
};

const createAirplane = async (data) => {
  const createdAirplane = await new AirplaneRepository().createAirplane(data);
  return createdAirplane;
};

module.exports = {
  getAirplane,
  updateAirplane,
  deleteAirplane,
  createAirplane,
};
