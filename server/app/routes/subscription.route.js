"use strict";

const subscriptionHandlerController = require("../controllers/subscriptionHandler");
const { catchError } = require("../libs/errorHandler");

module.exports = (app) => {
  app.post("/api/subscription", subscriptionHandlerController.handlePushNotificationSubscription);
  app.get("/api/subscription/:id", subscriptionHandlerController.sendPushNotification);
};
