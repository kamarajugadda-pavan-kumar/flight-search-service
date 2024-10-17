const CRUDRepository = require("./crud-repository");
const { Flight, Airplane, Airport, Sequelize } = require("../models");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { flightBookingEnums } = require("../utils/common/enums");

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
    // return await this.getResource(id);
    return await Flight.findByPk(id, {
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

  async getFlights(customFilter, sortOptions) {
    try {
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
    } catch (error) {
      throw new AppError("RepositoryError", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async updateFlight(data) {
    return await this.updateResource(data);
  }

  async deleteFlight(id) {
    return await this.deleteResource(id);
  }

  async modifyAvailableSeatsCount(id, data, transaction) {
    const [DECREMENT_ACTION, INCREMENT_ACTION] = flightBookingEnums;

    const flight = await Flight.findByPk(id, {
      transaction: transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!flight) {
      throw new AppError("Flight not found", StatusCodes.NOT_FOUND);
    }

    if (data.action == DECREMENT_ACTION) {
      if (flight.totalSeats - data.noOfSeats < 0) {
        throw new AppError(
          "No available seats to decrement",
          StatusCodes.BAD_REQUEST,
          null,
          [
            "Number of seats that you are trying to book is more than the available seats",
          ]
        );
      }
      await flight.decrement("totalSeats", {
        where: { id },
        by: data.noOfSeats,
        transaction,
      });
    } else if (data.action == INCREMENT_ACTION) {
      await flight.increment("totalSeats", {
        where: { id },
        by: data.noOfSeats,
        transaction,
      });
    } else {
      throw new AppError("Invalid action type", StatusCodes.BAD_REQUEST, null, [
        `${data.action} is an invalid action in request body`,
      ]);
    }

    return `${data.action} action successful.`;
  }
}
module.exports = FlightRepository;
