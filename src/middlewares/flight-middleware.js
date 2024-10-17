const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { flightBookingEnums } = require("../utils/common/enums");
const { parseCustomDate } = require("../utils/common/dateTime");

function validateCreateRequest(req, res, next) {
  let fields = [
    "flightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "arrivalTime",
    "departureTime",
    "price",
    "boardingGate",
    "totalSeats",
  ];

  for (let field of fields) {
    if (!req.body[field]) {
      let error = new AppError(
        "Something went wrong while creating flight",
        StatusCodes.BAD_REQUEST,
        null,
        [`${field} field missing`]
      );

      ErrorResponse.error = {
        explanation: error.explanation,
        details: error.details,
      };
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }

  next();
}

function validateModifyAvailableSeatsCount(req, res, next) {
  let error = new AppError(
    "Something went wrong while updating seat count",
    StatusCodes.BAD_REQUEST,
    null,
    []
  );

  if (!req.body.noOfSeats) {
    error.details.push("noOfSeats field missing");
  }

  if (
    (req.body.noOfSeats && isNaN(parseInt(req.body.noOfSeats))) ||
    parseInt(req.body.noOfSeats) < 0
  ) {
    error.details.push("noOfSeats is not a valid Integer");
  }

  if (!req.body.action) {
    error.details.push("action field missing");
  }

  if (req.body.action && !flightBookingEnums.includes(req.body.action)) {
    error.details.push("Value provided in action is invalid");
  }

  if (error.details.length) {
    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }

  next();
}

function validateFlightSearch(req, res, next) {
  try {
    let error = new AppError(
      "Something went wrong while searching for Flights",
      StatusCodes.BAD_REQUEST,
      null,
      []
    );
    const { trips, price, sort, travellers } = req.query;

    const tripRegex = /^[A-Z]{3}-[A-Z]{3}-(\d{2})(\d{2})(\d{4})$/;
    const tripMatch = trips.match(tripRegex);

    if (!tripMatch) {
      error.details.push("Invalid trips format. Use ORG-DEST-DDMMYYYY.");
      throw error;
    }
    const [_, day, month, year] = tripMatch;
    const dateOfFlight = `${year}-${month}-${day}`;

    // if (!dateOfFlight) {
    //   error.details.push("Date missing from query string");
    //   throw error;
    // }
    const date = new Date(dateOfFlight);
    if (
      isNaN(date.getTime()) ||
      date.getUTCFullYear() !== parseInt(year, 10) ||
      date.getUTCMonth() + 1 !== parseInt(month, 10) ||
      date.getUTCDate() !== parseInt(day, 10)
    ) {
      error.details.push("Invalid date provided in trips.");
      throw error;
    }

    const priceRegex = /^\d+-\d+$/;
    if (!priceRegex.test(price)) {
      error.details.push("Price should be in a range, e.g., 500-20000.");
      throw error;
    }

    const allowedSortOptions = [
      "price_asc",
      "price_desc",
      "departureTime_asc",
      "departureTime_desc",
    ];
    if (sort && !allowedSortOptions.includes(sort)) {
      error.details.push(
        "Invalid sort option. Use one of price_asc, price_desc, departureTime_asc, departureTime_desc."
      );
    }

    const travellersInt = parseInt(travellers, 10);
    if (isNaN(travellersInt) || travellersInt < 1) {
      error.details.push("Travellers must be a positive integer.");
    }

    next();
  } catch (error) {
    if (error instanceof AppError) {
      ErrorResponse.error = {
        explanation: error.explanation,
        details: error.details,
      };
      return res.status(error.statusCode).json(ErrorResponse);
    }
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

module.exports = {
  validateCreateRequest,
  validateModifyAvailableSeatsCount,
  validateFlightSearch,
};
