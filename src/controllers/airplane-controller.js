const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { AirplaneService } = require("../services");

const getAirplane = async (req, res) => {
  try {
    let data = await AirplaneService.getAirplane(req.params.id);
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

const updateAirplane = async (req, res) => {
  try {
    let data = await AirplaneService.updateAirplane(req.body);
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

const deleteAirplane = async (req, res) => {
  try {
    let data = await AirplaneService.deleteAirplane(req.params.id);
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

const createAirplane = async (req, res) => {
  try {
    let data = await AirplaneService.createAirplane(req.body);
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
  getAirplane,
  updateAirplane,
  deleteAirplane,
  createAirplane,
};
