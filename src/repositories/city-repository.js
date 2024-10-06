const CRUDRepository = require("./crud-repository");
const { City } = require("../models");

class CityRepository extends CRUDRepository {
  constructor() {
    super(City);
  }

  async createCity(data) {
    return await this.createResource(data);
  }

  async getCity(id) {
    return await this.getResource(id);
  }
  updateCity(data) {
    return this.updateResource(data);
  }

  deleteCity(id) {
    return this.deleteResource(id);
  }
}
module.exports = CityRepository;
