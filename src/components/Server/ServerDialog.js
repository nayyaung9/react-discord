import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { useDispatch, useSelector } from "react-redux";
import { createServerFormValidation } from "../../utils/formValidation";
import { Formik } from "formik";
import { serverActions } from "../../store/actions/server.action";

export default function ServerDialog({ open, handleClose }) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);

  const [state, setState] = useState({
    serverDialog: true,
    joinServerOpen: false,
    createServerOpen: false,
  });

  const onOpenJoinServer = () => {
    setState({ ...state, serverDialog: false, joinServerOpen: true });
  };

  const onCloseAllDialog = () => {
    setState({
      ...state,
      serverDialog: false,
      joinServerOpen: false,
      createServerOpen: false,
    });
  };

  const onCloseJoinServer = () => {
    setState({ ...state, serverDialog: true, joinServerOpen: false });
  };

  const onOpenCreateServer = () => {
    setState({ ...state, serverDialog: false, createServerOpen: true });
  };

  const onCloseCreateServer = () => {
    setState({ ...state, serverDialog: true, joinServerOpen: false });
  };

  return (
    <div>
      {state.serverDialog && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth="xs"
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">Create a Server</DialogTitle>
          <DialogContent>
            <img
              src="./image/discord.gif"
              alt="dc-gif"
              style={{
                width: 120,
                margin: "0px auto",
                paddingBottom: 30,
                display: "block",
              }}
            />

            <DialogContentText id="alert-dialog-description">
              <Button
                dense
                color="primary"
                variant="contained"
                fullWidth
                style={{ marginBottom: 10 }}
                onClick={onOpenJoinServer}
              >
                <PersonAddOutlinedIcon style={{ marginRight: 10 }} />
                Join a Server
              </Button>
              <Button
                dense
                variant="outlined"
                fullWidth
                style={{ background: "#3ca374", color: "white" }}
                onClick={onOpenCreateServer}
              >
                <CreateOutlinedIcon
                  style={{ marginRight: 10, color: "white" }}
                />
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
      )}

      {state.joinServerOpen && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth="xs"
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">Join a Server</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography>
                Enter a the Server Id provided by your friend and start chatting
                right now!
              </Typography>
              <TextField placeholder="Server Id" />
              <Button
                dense
                color="primary"
                variant="contained"
                fullWidth
                style={{ marginBottom: 10 }}
              >
                <PersonAddOutlinedIcon style={{ marginRight: 10 }} />
                Join a Server
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseJoinServer} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {state.createServerOpen && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth="xs"
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">Create a Server</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Formik
                initialValues={{
                  name: "",
                }}
                validationSchema={createServerFormValidation}
                onSubmit={(values) => {
                  const payload = {
                    name: values.name,
                    userId: auth._id,
                  };
                  dispatch(serverActions.createServer(payload));
                  onCloseAllDialog();
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
                      id="name"
                      placeholder="Server Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
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
                      <PersonAddOutlinedIcon style={{ marginRight: 10 }} />
                      Create a Server
                    </Button>
                  </form>
                )}
              </Formik>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseCreateServer} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
