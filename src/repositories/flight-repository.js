const CRUDRepository = require("./crud-repository");
const { Flight, Airplane, Airport, Sequelize } = require("../models");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class FlightRepository extends CRUDRepository {
  constructor() {
    super(Flight);
  }

  async createFlight(data) {
    try {
      const flight = await this.createResource(data);
      return flight;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else if (error.name == "SequelizeForeignKeyConstraintError") {
        if (error.index === "Flights_ibfk_1") {
          throw new AppError(
            "Invalid airplaneId: The airplane does not exist or is not valid.",
            StatusCodes.BAD_REQUEST,
            null,
            []
          );
        } else if (error.index === "Flights_ibfk_2") {
          throw new AppError(
            "Invalid departureAirportId: The departure airport does not exist or is not valid.",
            StatusCodes.BAD_REQUEST,
            null,
            []
          );
        } else if (error.index === "Flights_ibfk_3") {
          throw new AppError(
            "Invalid arrivalAirportId: The arrival airport does not exist or is not valid.",
            StatusCodes.BAD_REQUEST,
            null,
            []
          );
        }
      }
    }
  }

  async getFlight(id) {
    return await this.getResource(id);
  }

  async getFlights(customFilter, sortOptions) {
    return await Flight.findAll({
      where: customFilter,
      order: sortOptions,
      include: [
        {
          model: Airplane,
          as: "airplane",
        },
        {
          model: Airport,
          as: "departureAirport",
        },
        {
          model: Airport,
          as: "arrivalAirport",
        },
      ],
    });
  }

  updateFlight(data) {
    return this.updateResource(data);
  }

  deleteFlight(id) {
    return this.deleteResource(id);
  }
}
module.exports = FlightRepository;
