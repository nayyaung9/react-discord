"use strict";

const User = require("../models/User");

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
  const { email, fullname, avatar_url } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (!user) {
    try {
      let newUser = new User({
        fullname,
        email,
        avatar_url,
      });
      const result = await newUser.save();

      return res.status(200).json({ success: true, data: result });
    } catch (err) {
      return res.status(500).json({ success: false, data: err.message });
    }
  } else {
    try {
      let existedUser = await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({ success: true, data: existedUser });
    } catch (err) {
      return res.status(500).json({ success: false, data: err.message });
    }
  }
};
