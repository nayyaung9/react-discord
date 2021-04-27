const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortId = require("shortid");

const RoomType = {
  PUBLIC: 0,
  PRIVATE: 1,
};

const RoomSchema = new Schema(
  {
    code: { type: String, trim: true, unique: true },
    name: { type: String, lowercase: true, trim: true, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    //the admin of the room , or creator
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    privacy: { type: Number, required: true, default: RoomType.PUBLIC },
    last_msg: { type: Schema.Types.ObjectId, ref: "Chat" },
    //check if room is deleted or not
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

RoomSchema.pre("save", async function (next) {
  //generate a unique short code
  this.code = await shortId.generate();
  next();
});

let Room = mongoose.model("Room", RoomSchema);

module.exports = { Room, RoomType };
