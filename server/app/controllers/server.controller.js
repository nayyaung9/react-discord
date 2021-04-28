const Server = require("../models/Server");
const Channel = require("../models/Channel");

exports.createServer = async (req, res) => {
  const { name, userId } = req.body;
  // userId is an admin of this server

  let findExistedServer = await Server.findOne({ name });

  if (!findExistedServer) {
    try {
      let newDefaultChannel = new Channel({
        channel_name: "general",
      });

      await newDefaultChannel.save();

      let newServer = new Server({
        name,
        _admin: userId,
        _users: userId, // after creating the server, the admin also have joined this server.
        _channels: newDefaultChannel?._id,
      });

      await newServer.save();

      return res.status(200).json({ success: true, data: newServer });
    } catch (err) {
      return res.status(500).json({
        success: false,
        data: "There was an error while creating a server",
      });
    }
  }

  return res.status(403).json({
    success: false,
    data: "Server Already Existed",
  });
};

exports.fetchUserServer = async (req, res) => {
  const { userId } = req.params;

  await Server.find({ _users: { $in: userId } })
    .populate("_channels")
    .populate("_users")
    .populate("_admin")
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch(() => {
      return res
        .status(500)
        .json({ success: false, data: "Fetching Server are not available" });
    });
};

exports.joinServerById = async (req, res) => {
  const { serverId, userId } = req.body;

  let findExistedServer = await Server.findOne({ uniqueId: serverId });

  if (!findExistedServer) {
    return res
      .status(404)
      .json({ success: false, data: "Server Not Found or Server is deleted" });
  }

  let findThisUserIsJoined = await Server.find({ _users: { $in: userId } });

  if (!findThisUserIsJoined) {
    await Server.findOneAndUpdate(
      { uniqueId: serverId },
      {
        $push: {
          _users: userId,
        },
      },
      { new: true }
    )
      .populate("_channels")
      .populate("_users")
      .populate("_admin")
      .then((data) => {
        return res.status(200).json({ success: true, data });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ success: false, data: "Cant join right now." });
      });
  }
};
