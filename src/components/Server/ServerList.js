import React, { useState } from "react";
import { makeStyles, Avatar, IconButton, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ServerDialog from "./ServerDialog";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#202225",
  },

  serverImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderBottom: 20,
  },

  addButton: {
    backgroundColor: "#2f3136",
    width: "100%",
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
    marginTop: 20,
  },
}));

const items = [
  {
    name: "React",
    img: "./image/react.png",
  },
  {
    name: "Node",
    img: "./image/node.png",
  },
];

const ServerList = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="menu"
      >
        <HomeIcon style={{ color: '#fff' }} />
      </IconButton>
      <Divider />
      {items.map((item, i) => (
        <Avatar src={item.img} key={i} className={classes.serverImage} />
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
