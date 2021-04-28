import React from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import {
  makeStyles,
  Toolbar,
  AppBar,
  Typography,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import "./users.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  sidebar: {
    background: "#36393f",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#36393f",
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
    left: "auto",
    background: "#2f3136",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ActiveUserList = (props) => {
  const { window, onCloseActiveUser, activeUserOpen } = props;
  const activeServer = useSelector((state) => state.view.activeServer);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="active-users-list">
        <List>
          {activeServer?._users &&
            activeServer?._users.map((user, index) => (
              <ListItem button key={user}>
                <ListItemAvatar>
                  <Avatar>S</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="text-white">
                      {user.username}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </div>
    </React.Fragment>
  );
};

export default ActiveUserList;
