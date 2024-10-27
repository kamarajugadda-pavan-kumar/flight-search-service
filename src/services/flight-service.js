const { Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { isValidISODate, parseCustomDate } = require("../utils/common/dateTime");
const db = require("../models");
const { sequelize } = require("../models");

const getFlight = async (id) => {
  const flight = await new FlightRepository().getFlight(id);
  return flight;
};

const getFlights = async (query) => {
  try {
    const { trips, price, sort, travellers } = query;
    const customFilter = {};

    if (trips) {
      const [onwardDetails, returnDetails] = trips.split(",");
      if (onwardDetails) {
        const [start, dest, date] = onwardDetails.split("-");
        customFilter.departureAirportId = start;
        customFilter.arrivalAirportId = dest;
        customFilter.departureTime = {
          [Op.gte]: new Date(parseCustomDate(date)),
        };
      }
      if (returnDetails) {
        const [start, dest, date] = returnDetails.split("-");
        customFilter.returnFlight = {
          departureAirportId: start,
          arrivalAirportId: dest,
          departureTime: {
            [Op.gte]: new Date(parseCustomDate(date)),
          },
        };
      }
    }

    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      customFilter.price = {
        [Op.between]: [minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER],
      };
    }

    const sortOptions = [];
    if (sort) {
      const sortFilters = sort.split(",");
      for (let filter of sortFilters) {
        if (filter === "price_asc") {
          sortOptions.push(["price", "ASC"]);
        } else if (filter === "price_desc") {
          sortOptions.push(["price", "DESC"]);
        } else if (filter === "departureTime_asc") {
          sortOptions.push(["departureTime", "ASC"]);
        } else if (filter === "departureTime_desc") {
          sortOptions.push(["departureTime", "DESC"]);
        }
      }
    }

    if (travellers) {
      customFilter.totalSeats = {
        [Op.gte]: Number(travellers),
      };
    }

    const flights = await new FlightRepository().getFlights(
      customFilter,
      sortOptions
    );
    return flights;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Failed to fetch flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateFlight = async (data) => {
  const updatedFlight = await new FlightRepository().updateFlight(data);
  return updatedFlight;
};

const deleteFlight = async (id) => {
  const deletedFlight = await new FlightRepository().deleteFlight(id);
  return deletedFlight;
};

const createFlight = async (data) => {
  try {
    const { arrivalTime, departureTime } = data;
    // check if the arrival and departure times are in valid format
    if (!isValidISODate(arrivalTime) || !isValidISODate(departureTime)) {
      throw new AppError(
        "Invalid arrival and departure time format.",
        StatusCodes.BAD_REQUEST,
        null,
        [
          "arrivalTime and departureTime should be in YYYY-MM-DDTHH:mm:ssZ format",
        ]
      );
    }

    // check if the departure time is before the arrival time
    if (new Date(departureTime) > new Date(arrivalTime)) {
      throw new AppError(
        "Departure time cannot be after arrival time",
        StatusCodes.BAD_REQUEST,
        null,
        []
      );
    }

    const createdFlight = await new FlightRepository().createFlight(data);
    return createdFlight;
  } catch (error) {
    throw new AppError(
      "Failed to create flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const modifyAvailableSeatsCount = async (id, data) => {
  const t = await sequelize.transaction();
  try {
    const res = await new FlightRepository().modifyAvailableSeatsCount(
      id,
      data,
      t
    );
    await t.commit();
    return res;
  } catch (error) {
    await t.rollback();
    if (error instanceof AppError) throw error;
    throw new AppError(
      "something went wrong while updating the seat count",
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      []
    );
  }
};

module.exports = {
  getFlight,
  getFlights,
  updateFlight,
  deleteFlight,
  createFlight,
  modifyAvailableSeatsCount,
};
