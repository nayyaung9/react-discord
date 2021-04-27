import React from "react";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, Toolbar, AppBar, Typography } from "@material-ui/core";

const drawerWidth = 300;

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
  const { window, onCloseOpenUsers, openUsers } = props;

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
            open={openUsers}
            onClose={onCloseOpenUsers}
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
                  News
                </Typography>
              </Toolbar>
            </AppBar>
            ActiveUserList
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
};

export default ActiveUserList;
