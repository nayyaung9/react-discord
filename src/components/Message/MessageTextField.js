import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const MessageTextField = ({ activeChannel }) => {
  const [chatMessage, setChatMessage] = useState("");

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
      </div>
    </React.Fragment>
  );
};

export default MessageTextField;
