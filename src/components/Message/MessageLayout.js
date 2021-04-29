import React, { useEffect, useState, useRef } from "react";
import MessageTextField from "./MessageTextField";
import { makeStyles, IconButton, Fade } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { apiEndpoint } from "../../api";
import moment from "moment";
import DomPurify from "dompurify";

import "./message.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MessageLayout = ({
  onOpenSideBar,
  sideBarOpen,
  onOpenActiveUser,
  activeUserOpen,
}) => {
  const classes = useStyles();
  const [chatMessage, setChatMessage] = useState("");
  const [items, setItems] = useState([]);
  const activeChannel = useSelector((state) => state.view.activeChannel);
  const auth = useSelector((state) => state.auth.user);

  const socketRef = useRef();

  const scrollToBottom = () => {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  };

  const channelId = activeChannel?.uniqueId;

  useEffect(() => {
    socketRef.current = io(apiEndpoint, {
      query: { channelId },
    });

    socketRef.current.on("connect", function () {
      socketRef.current.emit("channel", channelId);
    });

    // event://init-message
    socketRef.current.on("event://init-message", (message) => {
      setItems(() => [message]);
      scrollToBottom();
    });

    socketRef.current.on("event://push-message", (message) => {
      setItems((items) => [message]);
      console.log("message", message);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [channelId]);

  const onSendMessage = (e) => {
    e.preventDefault();
    const payload = {
      message: chatMessage,
      senderId: auth?._id,
      channelId: activeChannel.uniqueId,
    };

    socketRef.current.emit("event://send-message", JSON.stringify(payload));

    setChatMessage("");
  };

  const isMessageCodeBlock = (message) => {
    if (message.startsWith("```") && message.endsWith("```")) return true;
    else return false;
  };

  const formatCode = (message) => {
    return message.split("```")[1];
  };

  return (
    <div className="message-layout">
      <div className="message-header">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => onOpenSideBar(!sideBarOpen)}
        >
          <MenuIcon className="white-icon" />
        </IconButton>
        <div className="title"># {activeChannel.channel_name}</div>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => onOpenActiveUser(!activeUserOpen)}
        >
          <PeopleIcon className="white-icon" />
        </IconButton>
      </div>
      <div style={{ height: 110 }} />
      <div className="message-body" id="chat">
        {items &&
          items.map((data) => {
            return data.map((item, i) => {
              console.log(item);
              return (
                <React.Fragment key={i}>
                  <Fade in={true} timeout={500}>
                    {item.event_type !== 0 ? (
                      <div className="post">
                        <div className="text">
                          <div className="timestamp">
                            {moment(item.createdAt).format("MMM DD YYYY  h:mm")}
                          </div>

                          <div className="message">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.message ? item.message : "",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="post">
                        <div className="avatar"></div>
                        <div className="text">
                          <div className="username">
                            {item?.sender?.username}
                          </div>
                          <div className="timestamp">
                            {moment(item.createdAt).format("MMM DD YYYY  h:mm")}
                          </div>

                          {!isMessageCodeBlock(
                            item.message ? item.message : ""
                          ) ? (
                            <div className="message">
                              {item.message ? item.message : ""}
                            </div>
                          ) : (
                            <pre className="prettyprint">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DomPurify.sanitize(
                                    formatCode(item.message ? item.message : "")
                                  ),
                                }}
                              />
                            </pre>
                          )}
                        </div>
                      </div>
                    )}
                  </Fade>
                </React.Fragment>
              );
            });
          })}
      </div>
      <div className="message-footer">
        <MessageTextField
          activeChannel={activeChannel}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
};

export default MessageLayout;
