"use strict";

const serverController = require("../controllers/server.controller");

module.exports = (app) => {
  app.route("/api/server").post(serverController.createServer);
  app.route("/api/server/:userId").get(serverController.fetchUserServer);
};
