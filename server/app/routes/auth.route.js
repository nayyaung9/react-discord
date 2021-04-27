"use strict";

const authController = require("../controllers/auth.controller");

module.exports = (app) => {
  app.route("/api/register").post(authController.register);
  app.route("/api/authenticate").post(authController.authenticate);
};
