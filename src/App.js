import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { alertAction } from "./store/actions/alert.action";
// pages
import IndexPage from "./pages/Index/IndexPage";
import Home from "./pages/home/Home";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert);

  const closeAlert = (open) => {
    dispatch(alertAction.closeAlert(open));
  };

  return (
    <Router history={history}>
      <Snackbar
        open={alert.open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={() => closeAlert(false)}
      >
        <Alert severity={alert.status} onClose={() => closeAlert(false)}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Route exact path="/" component={IndexPage} />
      <Route path="/home" component={Home} />
    </Router>
  );
}

export default App;
