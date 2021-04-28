var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const shortId = require("shortid");

var ChannelSchema = new Schema(
  {
    channel_name: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

ChannelSchema.pre("save", async function (next) {
  //generate a unique short code
  this.uniqueId = await shortId.generate();
  next();
});

module.exports = mongoose.model("Channel", ChannelSchema);
