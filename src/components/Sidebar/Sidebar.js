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
// actions & utils
import { useSelector, useDispatch } from "react-redux";
import { channelActions } from "../../store/actions/channel.action";
import { viewActions } from '../../store/actions/view.action';
import { createChannelFormValidation } from "../../utils/formValidation";
import { Formik } from "formik";
import "./sidebar.css";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: 5,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
    background: "transparent",
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

  const onSwitchChannel = (channel) => {
    dispatch(viewActions.changeChannelView(channel));
  }

  return (
    <React.Fragment>
      <ServerList />

      <div className="sidebar-container">
        <div className="sidebar-header">
          <div className="title">General</div>
        </div>
        <div className="sidebar-body">
          <div className="group">
            <div className="category">Text Channels</div>
            {activeServer &&
              Object.keys(activeServer).length > 1 &&
              activeServer._channels.map((channel, i) => (
                <div className="channel" key={i} onClick={() => onSwitchChannel(channel)}>
                  <div className="title"># {channel.channel_name}</div>
                </div>
              ))}
          </div>
          <div className="group">
            <div className="category">Voice Channels</div>
            <div className="channel">
              <div className="title"> channel</div>
            </div>
          </div>
        </div>

        <footer className="channels-footer">
          <img
            className="avatar"
            alt="Avatar"
            src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png"
          />
          <div className="channels-footer-details">
            <span className="username">yourself</span>
            <span className="tag">#0001</span>
          </div>
          <div className="channels-footer-controls button-group">
            <button aria-label="Mute" className="button button-mute"></button>
            <button
              aria-label="Deafen"
              className="button button-deafen"
            ></button>
            <button
              aria-label="Settings"
              className="button button-settings"
            ></button>
          </div>
        </footer>
      </div>

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
