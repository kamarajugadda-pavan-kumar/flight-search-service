const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    let error = new AppError(
      "Something went wrong while creating airplane",
      StatusCodes.BAD_REQUEST,
      null,
      ["name field missing"]
    );

    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }

  if (!req.body.capacity) {
    let error = new AppError(
      "Something went wrong while creating airplane",
      StatusCodes.BAD_REQUEST,
      null,
      ["capacity field missing"]
    );

    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }

  next();
}

module.exports = { validateCreateRequest };
