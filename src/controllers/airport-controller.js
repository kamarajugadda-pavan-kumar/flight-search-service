const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { AirportService } = require("../services");

const getAirport = async (req, res) => {
  try {
    let data = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const updateAirport = async (req, res) => {
  try {
    let data = await AirportService.updateAirport(req.body);
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const deleteAirport = async (req, res) => {
  try {
    let data = await AirportService.deleteAirport(req.params.id);
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const createAirport = async (req, res) => {
  try {
    let data = await AirportService.createAirport(req.body);
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = {
      explanation: error.explanation,
      details: error.details,
    };
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  getAirport,
  updateAirport,
  deleteAirport,
  createAirport,
};
