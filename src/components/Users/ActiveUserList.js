import React from "react";

import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import "./users.css";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 200,
    display: "flex",
    flexDirection: "row",
    borderRight: 0,
    background: "transparent",
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
      <Hidden smUp>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={activeUserOpen}
          onClose={onCloseActiveUser}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
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
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <div className="active-users-list">
          <div className="text-white">
            Online — {activeServer?._users && activeServer?._users.length}
          </div>

          <List>
            {activeServer?._users &&
              activeServer?._users.map((user, index) => (
                <ListItem button key={user}>
                  <ListItemAvatar>
                    <Avatar src="./image/discord.jpg" />
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
      </Hidden>
    </React.Fragment>
  );
};

export default ActiveUserList;
