const Server = require("../models/Server");
const Channel = require("../models/Channel");

exports.createChannel = async (req, res) => {
  const { channel_name, serverId } = req.body;

  try {
    let newChannel = new Channel({
      channel_name,
    });

    await newChannel.save();

    await Server.findOneAndUpdate(
      { uniqueId: serverId },
      {
        $push: {
          _channels: newChannel?.id,
        },
      },
      { new: true }
    ).then((data) => {
      const payload = {
        serverId,
        channel: newChannel
      }
      return res.status(200).json({ success: true, data: payload });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: "There was an error while creating a server",
    });
  }
};
