"use strict";

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONFIG = require("../../config/db");

exports.register = async (req, res) => {
  const { username } = req.body;

  let findExistedUsername = await User.findOne({ username });

  if (!findExistedUsername) {
    try {
      let newUser = new User(req.body);

      await newUser.save();

      return res.status(200).json({ success: true, data: newUser });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, data: "There was an error" });
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
        id: user._id,
        username: user.username,
        email: user.email,
        token: token,
      };
      return res.status(200).json({ success: true, data: credentials });
    }
  });
};
