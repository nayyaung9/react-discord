"use strict";

const roomController = require("../controllers/room.controller");
const { catchError } = require("../libs/errorHandler");

module.exports = (app) => {
  app.route("/api/room").post(catchError(roomController.createRoom));
  app.route("/api/rooms").get(catchError(roomController.fetchAllRooms));

  app.route("/api/room/:id").get(catchError(roomController.fetchRoomById));
  app.route("/api/room/:id/update").put(catchError(roomController.updateRoomName));

  app.route("/api/room").put(catchError(roomController.joinRoom));

  app.route("/api/user/:userId/rooms").get(catchError(roomController.fetchJoinedRoomByUser));

  app
    .route("/api/user/:userId/room/:roomId/leave")
    .put(catchError(roomController.leaveRoomByUserId));
};
