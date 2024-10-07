const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { flightBookingEnums } = require("../utils/common/enums");

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

module.exports = { validateCreateRequest, validateModifyAvailableSeatsCount };
