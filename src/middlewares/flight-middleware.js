const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

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

module.exports = { validateCreateRequest };
