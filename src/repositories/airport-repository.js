const CRUDRepository = require("./crud-repository");
const { Airport } = require("../models");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class AirportRepository extends CRUDRepository {
  constructor() {
    super(Airport);
  }

  async createAirport(data) {
    try {
      return await this.createResource(data);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else if (error.name == "SequelizeForeignKeyConstraintError") {
        throw new AppError(
          `Invalid cityId: The city with id ${data.cityId} does not exist.`,
          StatusCodes.BAD_REQUEST,
          error.stack, // Pass the original error's stack trace
          error.fields // Optional: additional details like the failing fields
        );
      }
    }
  }

  async getAirport(id) {
    return await this.getResource(id);
  }

  async updateAirport(data) {
    return await this.updateResource(data);
  }

  deleteAirport(id) {
    return this.deleteResource(id);
  }
}
module.exports = AirportRepository;
