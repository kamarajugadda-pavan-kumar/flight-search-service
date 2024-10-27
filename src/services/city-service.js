const { CityRepository } = require("../repositories");

const getCity = async (id) => {
  const city = await new CityRepository().getCity(id);
  return city;
};

const updateCity = async (data) => {
  const updatedCity = await new CityRepository().updateCity(data);
  return updatedCity;
};

const deleteCity = async (id) => {
  const deletedCity = await new CityRepository().deleteCity(id);
  return deletedCity;
};

const createCity = async (data) => {
  const createdCity = await new CityRepository().createCity(data);
  return createdCity;
};

module.exports = {
  getCity,
  updateCity,
  deleteCity,
  createCity,
};
