"use strict";

const authController = require("../controllers/auth.controller");

module.exports = (app) => {
  app.route("/api/register").post(authController.register);
};
