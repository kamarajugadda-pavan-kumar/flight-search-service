const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    let error = new AppError(
      "Something went wrong while creating airport",
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

  if (!req.body.code) {
    let error = new AppError(
      "Something went wrong while creating airport",
      StatusCodes.BAD_REQUEST,
      null,
      ["code field missing"]
    );

    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }

  if (!req.body.address) {
    let error = new AppError(
      "Something went wrong while creating airport",
      StatusCodes.BAD_REQUEST,
      null,
      ["address field missing"]
    );

    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }

  if (!req.body.cityId) {
    let error = new AppError(
      "Something went wrong while creating airport",
      StatusCodes.BAD_REQUEST,
      null,
      ["cityId field missing"]
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
