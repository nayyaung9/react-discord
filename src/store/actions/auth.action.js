import api from "../../api";
import { SAVE_AUTH_USER_DATA, OPEN_ALERT_STATUS } from "../action.types";
import history from "../../history";

const register = (data) => async (dispatch) => {
  await api
    .post("/api/register", data)
    .then((res) => {
      const { data } = res.data;
      dispatch({ type: SAVE_AUTH_USER_DATA, payload: data });
      history.push("/home");
    })
    .catch((err) => {
      const { data } = err.response.data;

      dispatch({
        type: OPEN_ALERT_STATUS,
        payload: {
          open: true,
          message: data,
          status: "warning",
        },
      });
    });
};

const authenticate = (data) => async (dispatch) => {
  await api
    .post("/api/authenticate", data)
    .then((res) => {
      const { data } = res.data;
      dispatch({ type: SAVE_AUTH_USER_DATA, payload: data });
      history.push("/home");
    })
    .catch((err) => {
      const { data } = err.response.data;
      console.log('err', err.response);
      dispatch({
        type: OPEN_ALERT_STATUS,
        payload: {
          open: true,
          message: data,
          status: "error",
        },
      });
    });
};

export const authActions = {
  register,
  authenticate,
};
