import React from "react";
import MessageTextField from "./MessageTextField";
import { makeStyles, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import { useSelector } from 'react-redux';
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

const MessageLayout = ({ onOpenSideBar, sideBarOpen }) => {
  const classes = useStyles();
  const activeChannel = useSelector((state) => state.view.activeChannel);

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
        >
          <PeopleIcon className="white-icon" />
        </IconButton>
      </div>
      <div style={{ height: 48 }} />
      <div className="message-body">
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>
        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">
              Resize the browser window to see the column layout.
            </div>
          </div>
        </div>

        <div className="post">
          <div className="avatar"></div>
          <div className="text">
            <div className="username">Username</div>
            <div className="timestamp">Today at 12:00 PM</div>
            <div className="message">This pen is still a work in progress.</div>
          </div>
        </div>
      </div>
      <div className="message-footer">
        <MessageTextField activeChannel={activeChannel} />
      </div>
    </div>
  );
};

export default MessageLayout;
