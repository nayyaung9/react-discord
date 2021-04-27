const { Room } = require("../models/Room");
const { Chat, EventType } = require("../models/Chat");

exports.createRoom = async (req, res) => {
  const { roomName, user: getAdminAsUser, admin, privacy } = req.body;

  try {
    let room = new Room({
      name: roomName,
      admin,
      users: getAdminAsUser,
      privacy,
    });

    await room.save();

    let createdMessage = new Chat({
      roomId: room.code,
      message: "created",
      event_type: EventType.SERVER,
      sender: admin,
    });
    await createdMessage.save();

    console.log("createdMessage", createdMessage);
    room.last_msg = createdMessage._id;

    return res.status(200).json({ status: true, data: room });
  } catch (err) {
    return res.status(500).json({ status: false, data: "Failed to create room" });
  }
};

exports.fetchAllRooms = async (req, res) => {
  await Room.find({ privacy: 0 })
    .populate("users", "-email -position -deviceToken -updatedAt -__v")
    .populate("admin", "-__v -email -position -deviceToken -updatedAt")
    .populate("last_msg")
    .populate({
      path: "last_msg",
      populate: { path: "sender" },
    })
    .limit(100)
    .then((data) => {
      return res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, data: err.message });
    });
};

exports.updateRoomName = async (req, res) => {
  const { id } = req.params;
  const { roomName, privacy, admin } = req.body;

  await Room.findOneAndUpdate(
    { code: id },
    {
      $set: {
        name: roomName,
        privacy,
      },
    },
    { new: true },
  )
    .then(async (data) => {
      let createdMessage = new Chat({
        roomId: id,
        message: "updated room",
        event_type: EventType.SERVER,
        sender: admin,
      });
      await createdMessage.save();

      return res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, data: err.message });
    });
};

exports.fetchRoomById = async (req, res) => {
  const { id } = req.params;

  await Room.findOne({ code: id })
    .populate("users", "-email -__v")
    .populate("admin", "-__v -email")
    .then((data) => {
      return res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, data: err.message });
    });
};

exports.joinRoom = async (req, res) => {
  const { roomId, user } = req.body;

  let foundRoom = await Room.findOne({ code: roomId });

  if (foundRoom) {
    let createdMessage = new Chat({
      roomId,
      message: "joined",
      event_type: EventType.JOIN,
      sender: user,
    });
    await createdMessage.save();

    try {
      await Room.findOneAndUpdate(
        { _id: foundRoom._id },
        {
          $push: {
            users: user,
          },
        },
        { new: true },
      ).then((data) => {
        return res.status(200).json({ status: true, data });
      });
    } catch (err) {
      return res.status(500).json({ status: true, data: err });
    }
  } else {
    return res.status(500).json({ status: true, data: "Room Not Found" });
  }
};

exports.fetchJoinedRoomByUser = async (req, res) => {
  const { userId } = req.params;

  await Room.find({
    users: { $in: userId },
  })
    .populate("users", "-email -__v -updatedAt")
    .populate("admin", "-email -__v -updatedAt")
    .then((data) => {
      return res.status(200).json({ status: true, data });
    })
    .catch((err) => {
      return res.status(500).json({ status: true, data: err });
    });
};

exports.leaveRoomByUserId = async (req, res) => {
  const { userId, roomId } = req.params;
  let getTargetedRoom = await Room.findOne({ code: roomId });

  await getTargetedRoom
    .update({ $pull: { users: { _id: userId } } })
    .then(async () => {
      let createdMessage = new Chat({
        roomId: getTargetedRoom.code,
        message: "leaved",
        event_type: EventType.SERVER,
        sender: userId,
      });
      await createdMessage.save();

      return res.status(200).json({ status: true, data: "User leave" });
    })
    .catch((err) => {
      console.log("Err leaveRoomByUserId", err);
      return res.status(500).json({ status: true, data: err });
    });
};
