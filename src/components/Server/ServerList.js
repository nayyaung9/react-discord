import React, { useState, useEffect } from "react";
import { makeStyles, IconButton, Divider, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ServerDialog from "./ServerDialog";
import { useDispatch, useSelector } from "react-redux";
import { serverActions } from "../../store/actions/server.action";
import { viewActions } from "../../store/actions/view.action";
import "./server.css";

const ServerList = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);
  const serversStore = useSelector((state) => state.server.servers);
  const servers = Object.values(serversStore);

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
    <div className="server-container">
      <div className="icon messenger" data-tooltip="Direct Messages"></div>
      {servers &&
        servers.map((server, i) => (
          <IconButton key={i} onClick={() => onChangeServerView(server)}>
            <div className="icon" data-tooltip={server.name} />
          </IconButton>
        ))}
      <IconButton onClick={handleClickOpen}>
        <AddIcon className="white-icon"/>
      </IconButton>

      <ServerDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default ServerList;
