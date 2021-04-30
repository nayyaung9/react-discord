"use strict";

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Server = require("../models/Server");
const CONFIG = require("../../config/db");
const Channel = require("../models/Channel");
const { ChannelMessage, EventType } = require("../models/ChannelMessage");

exports.register = async (req, res) => {
  const { username } = req.body;

  let findExistedUsername = await User.findOne({ username });

  if (!findExistedUsername) {
    try {
      let newUser = new User(req.body);

      await newUser.save();

      let findDefaultServer = await Server.findOne({
        name: "Default",
      }).populate("_channels");

      if (findDefaultServer) {
        const joinDefaultServer = await Server.findOneAndUpdate(
          {
            name: "Default",
          },
          {
            $push: {
              _users: newUser?._id,
            },
          },
          { new: true }
        );

        await joinDefaultServer.save();

        console.log("findDefaultServer", findDefaultServer);

        let createdMessage = new ChannelMessage({
          channelId: findDefaultServer._channels[0].uniqueId,
          message: `${newUser.username} has joined <br /> <b>${findDefaultServer.name}</b> Server`,
          event_type: EventType.SERVER,
          sender: newUser?._id,
        });
        await createdMessage.save();
      } else {
        let newDefaultChannel = new Channel({
          channel_name: "general",
        });

        await newDefaultChannel.save();

        let newDefaultServer = new Server({
          name: "Default",
          _admin: newUser?._id,
          _users: newUser?._id, // after creating the server, the admin also have joined this server.
          _channels: newDefaultChannel?._id,
        });

        await newDefaultServer.save();

        let createdMessage = new ChannelMessage({
          channelId: newDefaultChannel.uniqueId,
          message: `${newUser.username} has created <br /> <b>${newDefaultServer.name}</b> Server`,
          event_type: EventType.SERVER,
          sender: newUser?._id,
        });
        await createdMessage.save();
      }

      return res.status(200).json({ success: true, data: newUser });
    } catch (err) {
      console.log("err", err);
      return res
        .status(500)
        .json({ success: false, data: "Username or Email is already use." });
    }
  }

  return res.status(403).json({ success: false, data: "User Already Exist" });
};

exports.authenticate = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user)
    return res.status(404).json({ success: false, data: "User Not Found" });

  bcrypt.compare(password, user.password, async (err, result) => {
    if (!result) {
      return res
        .status(401)
        .json({ success: false, data: "Username or Password is incorrect" });
    }
    if (result) {
      var token = jwt.sign(
        { credentials: `${user._id}.${CONFIG.jwtSecret}.${user.email}` },
        CONFIG.jwtSecret,
        {}
      );

      const credentials = {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token,
      };
      return res.status(200).json({ success: true, data: credentials });
    }
  });
};
