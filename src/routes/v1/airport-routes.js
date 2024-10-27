const express = require("express");
const router = express.Router();
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");

router.get("/airport/:id", AirportController.getAirport);

router.put("/airport", AirportController.updateAirport);

router.delete("/airport/:id", AirportController.deleteAirport);

router.post(
  "/airport",
  [AirportMiddleware.validateCreateRequest],
  AirportController.createAirport
);

module.exports = router;
