import React from "react";
import { TextareaAutosize, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

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
        {!chatMessage.length < 1 && (
          <IconButton
            edge="start"
            style={{ marginLeft: 10, backgroundColor: '#7289da' }}
            onClick={onSendMessage}
            aria-label="menu"
          >
            <SendIcon className="white-icon" />
          </IconButton>
        )}
      </div>
    </React.Fragment>
  );
};

export default MessageTextField;
