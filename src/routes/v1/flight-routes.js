const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

router.get("/flight/:id", FlightController.getFlight);

router.get(
  "/flights",
  [FlightMiddleware.validateFlightSearch],
  FlightController.getFlights
);

router.put("/flight", FlightController.updateFlight);

router.delete("/flight/:id", FlightController.deleteFlight);

router.patch(
  "/flight/:id",
  [FlightMiddleware.validateModifyAvailableSeatsCount],
  FlightController.modifyAvailableSeatsCount
);

router.post(
  "/flight",
  [FlightMiddleware.validateCreateRequest],
  FlightController.createFlight
);

module.exports = router;
