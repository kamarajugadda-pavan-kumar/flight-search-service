const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");

router.get("/city/:id", CityController.getCity);

router.put("/city", CityController.updateCity);

router.delete("/city/:id", CityController.deleteCity);

router.post(
  "/city",
  [CityMiddleware.validateCreateRequest],
  CityController.createCity
);

module.exports = router;
