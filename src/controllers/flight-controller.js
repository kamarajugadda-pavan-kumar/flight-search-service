const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { FlightService } = require("../services");

const getFlight = async (req, res) => {
  try {
    let data = await FlightService.getFlight(req.params.id);
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

const getFlights = async (req, res) => {
  try {
    let data = await FlightService.getFlights(req.query);
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

const updateFlight = async (req, res) => {
  try {
    let data = await FlightService.updateFlight(req.body);
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

const deleteFlight = async (req, res) => {
  try {
    let data = await FlightService.deleteFlight(req.params.id);
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

const createFlight = async (req, res) => {
  try {
    let data = await FlightService.createFlight(req.body);
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

const modifyAvailableSeatsCount = async (req, res) => {
  try {
    const id = req.params.id;

    let data = await FlightService.modifyAvailableSeatsCount(id, req.body);
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
  getFlight,
  getFlights,
  updateFlight,
  deleteFlight,
  createFlight,
  modifyAvailableSeatsCount
};
