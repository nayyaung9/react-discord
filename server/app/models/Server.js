var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const shortId = require("shortid");

var ServerSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    _admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    _users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    uniqueId: {
      type: String,
    },
    _channels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },

  {
    timestamps: true,
  }
);

ServerSchema.pre("save", async function (next) {
  //generate a unique short code
  this.uniqueId = await shortId.generate();
  next();
});

module.exports = mongoose.model("Server", ServerSchema);
