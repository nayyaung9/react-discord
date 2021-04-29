import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const MessageTextField = ({
  onSendMessage,
  activeChannel,
  chatMessage,
  setChatMessage,
}) => {

  function handleOnChange(e) {
    if (e.target.value !== "\n") setChatMessage(e.target.value);
  }

  return (
    <React.Fragment>
      <div className="send-message-border" />
      <div className="send-message-container">
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder={`Message #${activeChannel.channel_name}`}
          className="message-text-area"
          value={chatMessage}
          onChange={(e) => handleOnChange(e)}
        />
        <button onClick={onSendMessage}>send</button>
      </div>
    </React.Fragment>
  );
};

export default MessageTextField;
