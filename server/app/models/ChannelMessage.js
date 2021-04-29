const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventType = {
  MESSAGE: 0,
  JOIN: 1,
  SERVER: 2,
};

const ChannelMessageSchema = new Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    channelId: {
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
  }
);

let ChannelMessage = mongoose.model("ChannelMessage", ChannelMessageSchema);

module.exports = { ChannelMessage, EventType };
