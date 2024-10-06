const express = require("express");
const router = express.Router();

const infoRoutes = require("./info-routes");
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");
const flightRoutes = require("./flight-routes");

router.use(infoRoutes);
router.use(airplaneRoutes);
router.use(cityRoutes);
router.use(airportRoutes);
router.use(flightRoutes);

module.exports = router;
