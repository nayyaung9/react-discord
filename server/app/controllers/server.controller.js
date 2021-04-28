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

  await Server.find({ _admin: userId })
    .populate("_channels")
    .populate("_users")
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      return res.status(200).json({ success: true, data: "" });
    });
};
