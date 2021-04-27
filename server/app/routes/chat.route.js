"use strict";

const chatController = require("../controllers/chat.controller");
const { catchError } = require("../libs/errorHandler");

module.exports = (app) => {
  app.route("/api/messages").get(chatController.fetchAllMessages);
};
