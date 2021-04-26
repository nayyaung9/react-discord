import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

export default function ServerDialog({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="xs"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Create Server</DialogTitle>
        <DialogContent>
          <img
            src="./image/discord.gif"
            alt="dc-gif"
            style={{ width: 120, marginBottom: 30 }}
          />
          <DialogContentText id="alert-dialog-description">
            <Button
              dense
              color="primary"
              variant="outlined"
              fullWidth
              style={{ marginBottom: 10 }}
            >
              <PersonAddOutlinedIcon />
              Join a Server
            </Button>
            <Button dense color="primary" variant="outlined" fullWidth>
              <CreateOutlinedIcon />
              Create a Server
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
