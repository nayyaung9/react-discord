"use strict";

const userController = require("../controllers/user.controller");
const { catchError } = require("../libs/errorHandler");

module.exports = (app) => {
  app.route("/api/users").get(catchError(userController.fetchAllUsers));
  app.route("/api/user/:id").get(catchError(userController.fetchUserDetail));
  app
    .route("/api/user/:id/deviceToken/notification")
    .put(catchError(userController.addUserDeviceTokenForPushNotification));
};
