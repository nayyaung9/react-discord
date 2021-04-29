"use strict";

const channelMessageController = require("../controllers/channelMessage.controller");

module.exports = (app) => {
  app
    .route("/api/message/channel")
    .post(channelMessageController.sendMessageToChannel);
  app
    .route("/api/message/channel/:channelId")
    .get(channelMessageController.fetchInitialMessageByChannelId);
};
