import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../Sidebar/Sidebar";
import ActiveUserList from "../Users/ActiveUserList";
import "./layout.css";
// mockup data
import { items } from "./chatItems";
import { Avatar } from "@material-ui/core";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: '100%',
    position: 'relative',
    overflowY: 'auto',
    maxHeight: 'calc(100 % - 64px)',
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
    background: "#36393f",
  },
  title: {
    flexGrow: 1,
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
  },
  messageLayout: {
    width: "100%",
    backgroundColor: "#36393f",
    bottom: 0,
    // position: "absolute",
    // maxHeight: 'calc(100 % - 64px)',
    // overflowY: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Layout(props) {
  const classes = useStyles();
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const [activeUserOpen, setActiveUserOpen] = React.useState(false);

  const onOpenSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const onCloseSideBar = () => {
    setSideBarOpen(false);
  };

  const onOpenActiveUser = () => {
    setActiveUserOpen(!activeUserOpen);
  };

  const onCloseActiveUser = () => {
    setActiveUserOpen(false);
  };

  const renderChatItems = (items) => {
    return items.map((item, i) => (
      <div
        key={i}
        style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}
      >
        <Avatar
          src="./image/discord.jpg"
          style={{ marginRight: 10 }}
          alt={item.username + i}
        />
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography style={{ marginRight: 10 }}>{item.username}</Typography>
            <Typography>{item.timestamps}</Typography>
          </div>
          <Typography>{item.message}</Typography>
        </div>
      </div>
    ));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onOpenSideBar}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onOpenActiveUser}
            className={classes.menuButton}
          >
            <PeopleOutlineOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Sidebar sideBarOpen={sideBarOpen} onCloseSideBar={onCloseSideBar} />
      <div className={classes.messageLayout}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {renderChatItems(items)}
        </main>
      </div>

      <ActiveUserList
        onCloseActiveUser={onCloseActiveUser}
        activeUserOpen={activeUserOpen}
      />
    </div>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;
