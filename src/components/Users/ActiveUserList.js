import React from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, Toolbar, AppBar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

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
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
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
            ActiveUserList mobile
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <AppBar position="static" className={classes.sidebar}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Active Users
                </Typography>
              </Toolbar>
            </AppBar>

            <List>
              {activeServer?._users &&
                activeServer?._users.map((user, index) => (
                  <ListItem button key={user}>
                    <ListItemText
                      primary={`${user.username}`}
                      style={{ color: "#fff" }}
                    />
                  </ListItem>
                ))}
            </List>
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
};

export default ActiveUserList;
