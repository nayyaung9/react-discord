import React, { useState } from "react";
import {
  makeStyles,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { Formik } from "formik";
import {
  registerFormValidation,
  loginFormValidation,
} from "../../utils/formValidation";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/actions/auth.action';
import history from '../../history';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#36393f",
  },
  paper: {
    backgroundColor: "#2f3136",
    padding: theme.spacing(4),
  },
  textWhite: {
    color: "#fff",
    fontWeight: "bold",
  },
  textGrey: {
    color: "#f0f2f5",
  },
  secondaryText: {
    color: "#fff",
  },
  rowLayout: {
    marginTop: 20,
  },
  actionCard: {
    padding: theme.spacing(2),
    backgroundColor: "#2f3136",
  },
  actionTitle: {
    fontWeight: "bold",
  },
  actionText: {
    color: "white",
  },
  actionIcon: {
    display: "block",
    textAlign: "center",
    width: "100%",
    color: "white",
    fontSize: 24,
  },
  greenButton: {
    display: "block",
    margin: "20px auto",
    backgroundColor: "#3ca374",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  blueButton: {
    display: "block",
    margin: "20px auto",
    backgroundColor: "#7289da",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  input: {
    color: "white",
  },
}));

const IndexPage = () => {
  const classes = useStyles();
  const [mainView, setMainView] = useState(true);
  const [onRegister, setOnRegister] = useState(false);
  const auth = useSelector(state => state.auth);

  console.log(auth);

  React.useEffect(() => {
    if(typeof auth === 'object') {
      if(auth.isAuth) {
        history.push('/home')
      }
    }
  }, []);
  const dispatch = useDispatch();

  const onChangeView = (e) => {
    e.preventDefault();
    setMainView(false);
    setOnRegister(true);
  };

  const onSwithBackToLogin = (e) => {
    e.preventDefault();
    setMainView(true);
    setOnRegister(false);
  };
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          {mainView && (
            <React.Fragment>
              <Typography
                variant="h5"
                className={classes.textWhite}
                align="center"
              >
                Welcome Back!
              </Typography>
              <Typography
                variant="body1"
                className={classes.secondaryText}
                align="center"
              >
                We are so existed to see you again!
              </Typography>

              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={loginFormValidation}
                onSubmit={(values) => {
                  dispatch(authActions.authenticate(values));
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
                    <div style={{ marginBottom: 5 }}>
                      <Typography className={classes.textGrey}>
                        Username
                      </Typography>

                      <TextField
                        type="text"
                        id="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.username ? errors.username : ""}
                        error={touched.username && Boolean(errors.username)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        size="small"
                        autoComplete="off"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography className={classes.textGrey}>
                        Password
                      </Typography>

                      <TextField
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    </div>

                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      className={classes.blueButton}
                    >
                      Login
                    </Button>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography className={classes.secondaryText}>
                        Need an account?
                      </Typography>
                      &nbsp;
                      <a
                        href="/#"
                        onClick={onChangeView}
                        style={{ color: "#7289da", textDecoration: "none" }}
                      >
                        Register
                      </a>
                    </div>
                  </form>
                )}
              </Formik>
            </React.Fragment>
          )}

          {onRegister && (
            <React.Fragment>
              <Typography
                variant="h5"
                className={classes.textWhite}
                align="center"
              >
                Create an account
              </Typography>

              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                }}
                validationSchema={registerFormValidation}
                onSubmit={(values) => {
                  dispatch(authActions.register(values));
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
                    <div style={{ marginBottom: 5, marginTop: 20 }}>
                      <Typography className={classes.textGrey}>
                        Email
                      </Typography>
                      <TextField
                        type="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography className={classes.textGrey}>
                        Username
                      </Typography>

                      <TextField
                        type="text"
                        id="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.username ? errors.username : ""}
                        error={touched.username && Boolean(errors.username)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography className={classes.textGrey}>
                        Password
                      </Typography>

                      <TextField
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography className={classes.textGrey}>
                        Confirm Password
                      </Typography>

                      <TextField
                        type="password"
                        id="password_confirmation"
                        value={values.password_confirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.password_confirmation
                            ? errors.password_confirmation
                            : ""
                        }
                        error={
                          touched.password_confirmation &&
                          Boolean(errors.password_confirmation)
                        }
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    </div>
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      className={classes.blueButton}
                    >
                      Register
                    </Button>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <a
                        href="/#"
                        onClick={onSwithBackToLogin}
                        style={{ color: "#7289da", textDecoration: "none" }}
                      >
                        Already have an account?
                      </a>
                    </div>
                  </form>
                )}
              </Formik>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default IndexPage;
