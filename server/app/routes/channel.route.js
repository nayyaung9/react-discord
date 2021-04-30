"use strict";

const channelController = require("../controllers/channel.controller");

module.exports = (app) => {
  app.route("/api/channel/new").post(channelController.createChannel);

  app
    .route("/api/channel/:channelId/delete")
    .delete(channelController.deleteChannel);
};
