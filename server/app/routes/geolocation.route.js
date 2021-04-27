"use strict";

const geolocationController = require("../controllers/geolocation.controller");
const { catchError } = require("../libs/errorHandler");

module.exports = (app) => {
  app.route("/api/user/:userId/geolocation").post(geolocationController.getUserLocation);

  app.route("/api/user/:userId/nearby/friends").get(catchError(geolocationController.findNear));
};
