const CRUDRepository = require("./crud-repository");
const { Airplane } = require("../models");
// const { Airplane } = require("../models/airplane");
class AirplaneRepository extends CRUDRepository {
  constructor() {
    super(Airplane);
  }

  async createAirplane(data) {
    return await this.createResource(data);
  }

  async getAirplane(id) {
    return await this.getResource(id);
  }
  updateAirplane(data) {
    return this.updateResource(data);
  }

  deleteAirplane(id) {
    return this.deleteResource(id);
  }
}
module.exports = AirplaneRepository;
