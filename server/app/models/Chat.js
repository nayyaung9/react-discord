const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventType = {
  MESSAGE: 0,
  JOIN: 1,
  SERVER: 2,
  TYPING: 3,
};

const chatSchema = new Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    roomId: {
      type: String,
    },
    event_type: {
      type: Number,
      required: true,
      default: EventType.MESSAGE,
    },
  },
  {
    timestamps: true,
  },
);

let Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat, EventType };
