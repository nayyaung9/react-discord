import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Avatar,
  IconButton,
  Divider,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ServerDialog from "./ServerDialog";
import HomeIcon from "@material-ui/icons/Home";
import { useDispatch, useSelector } from "react-redux";
import { serverActions } from "../../store/actions/server.action";
import { viewActions } from "../../store/actions/view.action";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#202225",
  },

  addButton: {
    backgroundColor: "#2f3136",
    display: "block",
    margin: "0 auto",
    "&:hover": {
      background: "green",
      borderRadius: 10,
    },
  },
  addIcon: {
    color: "green",
    "&:hover": {
      color: "white",
    },
  },
  systemButtons: {
    marginTop: 10,
  },
}));

const ServerList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);
  const servers = useSelector((state) => state.server.servers);

  useEffect(() => {
    dispatch(serverActions.fetchUserServer(auth?._id));
  }, [auth._id]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeServerView = (server) => {
    return dispatch(viewActions.changeServerView(server));
  };
  return (
    <div className={classes.root}>
      <IconButton color="inherit" aria-label="menu">
        <HomeIcon style={{ color: "#fff" }} />
      </IconButton>
      <Divider />
      {servers &&
        servers.map((server, i) => (
          <Tooltip
            title={server.name}
            placement="right"
            key={i}
            onClick={() => onChangeServerView(server)}
          >
            <IconButton>
              <Avatar src="./image/discord.jpg" />
            </IconButton>
          </Tooltip>
        ))}
      <div className={classes.systemButtons}>
        <IconButton
          className={classes.addButton}
          color="inherit"
          aria-label="menu"
          onClick={handleClickOpen}
        >
          <AddIcon className={classes.addIcon} />
        </IconButton>
      </div>

      <ServerDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default ServerList;
