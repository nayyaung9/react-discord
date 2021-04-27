import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Button,
  IconButton,
} from "@material-ui/core";
import ServerList from "../Server/ServerList";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  sidebar: {
    background: "#2f3136",
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
    marginRight: 5,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  authUserLayout: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "75%",
    background: "#2a2c31",
    padding: 20,
  },
  authUserRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const Sidebar = (props) => {
  const { window, sideBarOpen, onCloseSideBar } = props;
  const classes = useStyles();
  const theme = useTheme();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <ServerList />
      <div style={{ background: "#2f3136", width: "100%" }}>
        <AppBar position="static" className={classes.sidebar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
          </Toolbar>
        </AppBar>

        <List>
          {["general", "gaming", "programming", "Health", "Science"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={`# ${text}`} style={{ color: "#fff" }} />
              </ListItem>
            )
          )}
        </List>

        <div className={classes.authUserLayout}>
          <div className={classes.authUserRow}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                className={classes.menuButton}
              >
                <PersonOutlinedIcon />
              </IconButton>
              <Typography style={{ color: '#fff' }}>Ray4</Typography>
            </div>
            <Button style={{ color: '#fff' }} >Sign Out</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={sideBarOpen}
          onClose={onCloseSideBar}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
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
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
