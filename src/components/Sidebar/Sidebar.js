import React, { useState } from "react";
// Components
import {
  makeStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";
import ServerList from "../Server/ServerList";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import AddIcon from "@material-ui/icons/Add";
// actions & utils
import { useSelector, useDispatch } from "react-redux";
import { channelActions } from "../../store/actions/channel.action";
import { createChannelFormValidation } from "../../utils/formValidation";
import { Formik } from "formik";

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
  title: {
    display: "block",
    flexGrow: 1,
    flexWrap: "wrap",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  authUserLayout: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "77%",
    background: "#2a2c31",
    padding: "0 10px",
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
  const auth = useSelector((state) => state.auth.user);
  const activeServer = useSelector((state) => state.view.activeServer);
  const dispatch = useDispatch();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [createChannelDialog, setCreateChannelDialog] = useState(false);

  const onCloseCreateChannelDialog = () => {
    setCreateChannelDialog(false);
  };

  const onOpenCreateChannelDialog = () => {
    setCreateChannelDialog(true);
  };

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
            <Typography variant="body2" className={classes.title}>
              {activeServer ? activeServer.name : "Channels"}
            </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={onOpenCreateChannelDialog}
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List>
          {activeServer?._channels &&
            activeServer?._channels.map((channel, index) => (
              <ListItem button key={channel}>
                <ListItemText
                  primary={`# ${channel.channel_name}`}
                  style={{ color: "#fff" }}
                />
              </ListItem>
            ))}
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
              <Typography style={{ color: "#fff" }}>{auth.username}</Typography>
            </div>
            <Button style={{ color: "#fff" }}>Sign Out</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
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

      <Dialog
        open={createChannelDialog}
        onClose={onCloseCreateChannelDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="xs"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Create a Text Channel</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Formik
              initialValues={{
                channel_name: "",
              }}
              validationSchema={createChannelFormValidation}
              onSubmit={(values) => {
                const payload = {
                  channel_name: values.channel_name,
                  serverId: activeServer?.uniqueId,
                  userId: auth?._id, // for fetch after creating a new channel
                };
                dispatch(channelActions.createChannel(payload));
                onCloseCreateChannelDialog();
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    id="channel_name"
                    placeholder="Channel Name"
                    value={values.channel_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.channel_name ? errors.channel_name : ""}
                    error={touched.channel_name && Boolean(errors.channel_name)}
                    style={{ margin: "10px 0" }}
                    variant="outlined"
                    fullWidth
                    size="small"
                  />

                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    style={{ background: "#3ca374", color: "white" }}
                  >
                    Create a Channel
                  </Button>
                </form>
              )}
            </Formik>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseCreateChannelDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Sidebar;
