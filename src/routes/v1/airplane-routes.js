const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");

router.get("/airplane/:id", AirplaneController.getAirplane);

router.put("/airplane", AirplaneController.updateAirplane);

router.delete("/airplane/:id", AirplaneController.deleteAirplane);

router.post(
  "/airplane",
  [AirplaneMiddleware.validateCreateRequest],
  AirplaneController.createAirplane
);

module.exports = router;
