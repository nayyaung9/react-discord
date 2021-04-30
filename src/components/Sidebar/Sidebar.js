import React, { useState } from "react";
// Components
import {
  makeStyles,
  SwipeableDrawer,
  Hidden,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  withStyles,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ServerList from "../Server/ServerList";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
// actions & utils
import { useSelector, useDispatch } from "react-redux";
import { channelActions } from "../../store/actions/channel.action";
import { viewActions } from "../../store/actions/view.action";
import { createChannelFormValidation } from "../../utils/formValidation";
import { Formik } from "formik";
import "./sidebar.css";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 320,
    display: "flex",
    flexDirection: "row",
    borderRight: 0,
    background: "#303136",
  },
}));

const Sidebar = (props) => {
  const { window, sideBarOpen, onCloseSideBar } = props;
  const classes = useStyles();

  const auth = useSelector((state) => state.auth.user);
  const activeServer = useSelector((state) => state.view.activeServer);
  const activeChannel = useSelector((state) => state.view.activeChannel);
  const dispatch = useDispatch();

  const [sideBarMenu, setSideBarMenu] = React.useState(null);
  const [channelMenu, setChannelMenu] = React.useState(null);
  const [deleteChannelDialog, setDeleteChannelDialog] = React.useState(false);
  const [currentChannel, setCurrentChannel] = useState({});

  const onOpenSideBarMenu = (event) => {
    setSideBarMenu(event.currentTarget);
  };

  const onCloseSideBarMenu = () => {
    setSideBarMenu(null);
  };

  const onOpenChannelMenu = (event, channel) => {
    setCurrentChannel(channel);
    setChannelMenu(null);
    setChannelMenu(event.currentTarget);
  };

  const onCloseChannelMenu = () => {
    setChannelMenu(null);
  };

  const [createChannelDialog, setCreateChannelDialog] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const onCloseCreateChannelDialog = () => {
    setCreateChannelDialog(false);
  };

  const onOpenCreateChannelDialog = () => {
    setCreateChannelDialog(true);
  };

  const onSwitchChannel = (channel) => {
    dispatch(viewActions.changeChannelView(channel));
  };

  const onCopyServerId = (serverId) => {
    navigator.clipboard.writeText(serverId ? serverId.uniqueId : "");
    dispatch({
      type: "OPEN_ALERT_STATUS",
      payload: {
        open: true,
        message: "Copied Server Id",
        status: "success",
      },
    });
  };

  const onOpendeleteChannelDialog = (e, channel) => {
    onOpenChannelMenu(e, channel);
    setChannelMenu(null);

    setDeleteChannelDialog(true);
  };

  const onCloseDeleteChannelDialog = () => {
    setDeleteChannelDialog(false);
  };

  const onDeleteChannelAction = (channelId) => {
    dispatch(channelActions.deleteChannel(channelId));
    setDeleteChannelDialog(false);
  };
  const responsiveView = () => {
    return (
      <React.Fragment>
        <ServerList />

        <div className="sidebar-container">
          <div className="sidebar-header">
            <div className="flex flex-row justify-between">
              <div className="title">
                {activeServer ? activeServer.name : "Home"}
              </div>
              <IconButton onClick={onOpenSideBarMenu}>
                {sideBarOpen ? (
                  <ArrowDropDownIcon
                    className="white-icon"
                    style={{ width: 20 }}
                  />
                ) : (
                  <ArrowDropUpIcon
                    className="white-icon"
                    style={{ width: 20 }}
                  />
                )}
              </IconButton>
            </div>
          </div>

          <StyledMenu
            id="customized-menu"
            anchorEl={sideBarMenu}
            keepMounted
            open={Boolean(sideBarMenu)}
            onClose={onCloseSideBarMenu}
          >
            <MenuItem button onClick={() => onCopyServerId(activeServer)}>
              <ListItemIcon>
                <PersonAddIcon className="white-icon" />
              </ListItemIcon>
              <ListItemText primary="Copy Server Id" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <EditIcon className="white-icon" />
              </ListItemIcon>
              <ListItemText primary="Rename Server" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DeleteIcon className="white-icon" />
              </ListItemIcon>
              <ListItemText primary="Delete Server" />
            </MenuItem>
          </StyledMenu>

          <div className="sidebar-body">
            <div className="group">
              <div className="flex flex-row justify-between">
                <div className="category">Text Channels</div>
                <IconButton onClick={onOpenCreateChannelDialog}>
                  <AddIcon className="white-icon" style={{ width: 20 }} />
                </IconButton>
              </div>
              {activeServer &&
                Object.keys(activeServer).length > 1 &&
                activeServer._channels.map((channel, i) => (
                  <div
                    className={`channel flex flex-row justify-between ${
                      channel.uniqueId === activeChannel.uniqueId
                        ? "active"
                        : ""
                    }`}
                    key={i}
                    onClick={() => onSwitchChannel(channel)}
                  >
                    <div className="title"># {channel.channel_name}</div>
                    <IconButton
                      className="channel-setting-icon"
                      onClick={(e) => onOpenChannelMenu(e, channel)}
                    >
                      <SettingsIcon
                        className="white-icon"
                        style={{ width: 12 }}
                      />
                    </IconButton>
                  </div>
                ))}
            </div>

            <StyledMenu
              id="customized-menu"
              anchorEl={channelMenu}
              keepMounted
              open={Boolean(channelMenu)}
              onClose={onCloseChannelMenu}
            >
              <MenuItem>
                <ListItemIcon>
                  <EditIcon className="white-icon" />
                </ListItemIcon>
                <ListItemText primary="Rename Channel" />
              </MenuItem>
              <MenuItem
                button
                onClick={(e) => onOpendeleteChannelDialog(e, currentChannel)}
              >
                <ListItemIcon>
                  <DeleteIcon className="white-icon" />
                </ListItemIcon>
                <ListItemText primary="Delete Channel" />
              </MenuItem>
            </StyledMenu>

            <div className="group">
              <div className="flex flex-row justify-between">
                <div className="category">Voice Channels</div>
                <IconButton>
                  <AddIcon className="white-icon" style={{ width: 20 }} />
                </IconButton>
              </div>
              <div className="channel">
                <div className="title flex flex-row">
                  <VolumeUpIcon /> &nbsp; General
                </div>
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
              <span className="username">
                {auth ? auth.username : "Visitor"}
              </span>
            </div>
            <div className="channels-footer-controls button-group">
              <button aria-label="Mute" className="button button-mute">
                <MicIcon />
              </button>
              <button aria-label="Deafen" className="button button-deafen">
                <HeadsetIcon />
              </button>
              <button aria-label="Settings" className="button button-settings">
                <SettingsIcon />
              </button>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Hidden smUp>
        <SwipeableDrawer
          container={container}
          variant="temporary"
          anchor="left"
          open={sideBarOpen}
          onClose={onCloseSideBar}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {responsiveView()}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>{responsiveView()}</Hidden>

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

      <Dialog
        open={deleteChannelDialog}
        onClose={onCloseDeleteChannelDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          #{currentChannel.channel_name} Channel Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this channel #
            {currentChannel.channel_name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteChannelDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => onDeleteChannelAction(currentChannel.uniqueId)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #1F2124",
    background: "#1F2124",
    color: "white",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default Sidebar;
