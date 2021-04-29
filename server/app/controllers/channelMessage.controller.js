const { ChannelMessage, EventType } = require("../models/ChannelMessage");

exports.sendMessageToChannel = async (data, io) => {
  const { message, channelId, senderId } = data;

  try {
    let chat = new ChannelMessage({
      message,
      sender: senderId,
      channelId,
      event_type: EventType.MESSAGE,
    });

    await chat.save().then(async (result) => {
      await ChannelMessage.find({
        channelId,
      })
        .populate("sender")
        .then((data) => {
          io.in(channelId).emit("event://push-message", data);
        });
    });
  } catch (err) {
    console.log("Send message error", err);
  }
};

exports.fetchInitialMessageByChannelId = async (channelId, io) => {
  try {
    await ChannelMessage.find({ channelId })
      .populate("sender")
      .limit(100)
      .then((data) => {
        // console.log('channelIddd', data)
        // console.log('data', data);
        io.in(channelId).emit("event://init-message", data);
      });
  } catch (err) {
    console.log("fetchMessageByRoomId error", err);
  }
};
