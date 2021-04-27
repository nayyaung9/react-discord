"use strict";

const { Chat, EventType } = require("../models/Chat");
const { Room } = require("../models/Room");
var FCM = require("fcm-node");

exports.fetchAllMessages = async (req, res) => {
  await Chat.find()
    .populate("sender")
    .then((data) => {
      return res.status(200).json({ status: true, data });
    });
};

exports.sendMessage = async (data, io) => {
  const { message, roomId, sender } = data;

  var serverKey =
    "AAAAnkUgEbM:APA91bGgOiGaDcLFmsURPYh7OyjV1bCkE_YOXoORbJYebqK3Z8hSDsB1hy99aDqSuFkTA46-tDczI3Je02RZOrSN98L9ohm7FUzKZyCZDS8l6MTrD0LMAOr1GubKnaW9EXUY65bxY7Cm"; // put your server key here
  var fcm = new FCM(serverKey);

  try {
    let chat = new Chat({
      message,
      sender: sender._id,
      roomId,
      event_type: EventType.MESSAGE,
    });

    await chat.save().then(async (result) => {
      await Room.findOneAndUpdate(
        { code: roomId },
        {
          $set: {
            last_msg: result._id,
          },
        },
        { new: true },
      );

      await Chat.find({ roomId, _id: result._id })
        .populate("sender")
        .then(async (data) => {
          io.in(roomId).emit("event://push-message", data);

          let findRoom = await Room.findOne({ code: roomId }).populate("users");
          var registrationTokens = [];

          async function getRegistrationTokens() {
            findRoom.users &&
              findRoom.users.forEach(function (user) {
                console.log("user", user);
                registrationTokens.push(user.deviceToken ? user.deviceToken : "");
              });
            return registrationTokens;
          }

          async function sendNotificationToDevice() {
            await getRegistrationTokens();
            console.log("registrationTokens", registrationTokens);

            let filteredRegisterTokens = registrationTokens.filter(function (token) {
              return token !== null;
            });

            console.log("filteredRegisterTokens", filteredRegisterTokens);
            var fcmMessage = {
              registration_ids: filteredRegisterTokens,

              notification: {
                title: `${data[0].sender.fullname} sent a message.`,
                subtitle: "Talkie-Phote: You have received a new message",
                body: message,
                click_action: `https://talkie-phote.netlify.app/chat/${data[0].roomId}`,
                icon: "https://talkie-phote.netlify.app/assets/image/appLogo.png",
                sound: "https://talkie-phote.netlify.app/assets/audio/notification.mp3",
              },
            };

            fcm.send(fcmMessage, function (err, response) {
              if (err) {
                console.log("Something has gone wrong!", err);
              } else {
                console.log("Successfully sent with response: ", response);
              }
            });
          }

          sendNotificationToDevice();
        });
    });
  } catch (err) {
    console.log("Send message error", err);
  }
};

exports.fetchInitialMessageByRoomId = async (roomId, io) => {
  try {
    await Chat.find({ roomId })
      .populate("sender")
      .limit(100)
      .then((res) => {
        io.in(roomId).emit("event://init-message", res);
      });
  } catch (err) {
    console.log("fetchMessageByRoomId error", err);
  }
};
