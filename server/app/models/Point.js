var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PointSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    coordinates: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Point", PointSchema);
