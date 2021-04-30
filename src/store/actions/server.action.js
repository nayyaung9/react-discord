import api from "../../api";
import {
  OPEN_ALERT_STATUS,
  USER_SERVERS_LIST,
  CHANGE_SERVER_VIEW,
  ADD_NEW_SERVER_TO_USER_JOINED,
} from "../action.types";

const createServer = (data) => async (dispatch) => {
  await api
    .post("/api/server", data)
    .then(async () => {
      dispatch({
        type: OPEN_ALERT_STATUS,
        payload: {
          open: true,
          message: "Server created successfully",
          status: "success",
        },
      });
      await api
        .get(`/api/server/${data.userId}`)
        .then((res) => {
          const { data } = res.data;
          dispatch({ type: USER_SERVERS_LIST, payload: data });
        })
        .catch((err) => {
          dispatch({
            type: OPEN_ALERT_STATUS,
            payload: {
              open: true,
              message: "Getting your server have a few error",
              status: "error",
            },
          });
        });
    })
    .catch((err) => {
      const { data } = err.response.data;

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

const fetchUserServer = (userId) => async (dispatch) => {
  await api
    .get(`/api/server/${userId}`)
    .then((res) => {
      const { data } = res.data;
      dispatch({ type: USER_SERVERS_LIST, payload: data });
      dispatch({ type: CHANGE_SERVER_VIEW, payload: data[0] });
    })
    .catch((err) => {
      dispatch({
        type: OPEN_ALERT_STATUS,
        payload: {
          open: true,
          message: "Getting your server have a few error",
          status: "error",
        },
      });
    });
};

const joinServer = (payload) => async (dispatch, getStore) => {
  const userId = getStore().auth.user._id;

  await api
    .post(`/api/server/join`, payload)
    .then(async (res) => {
      await api
        .get(`/api/server/${userId}`)
        .then((res) => {
          const { data } = res.data;
          dispatch({ type: USER_SERVERS_LIST, payload: data });
          dispatch({ type: CHANGE_SERVER_VIEW, payload: data[0] });
        })
        .catch((err) => {
          dispatch({
            type: OPEN_ALERT_STATUS,
            payload: {
              open: true,
              message: "Getting your server have a few error",
              status: "error",
            },
          });
        });
    })
    .catch((err) => {
      const { data } = err.response.data;

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

export const serverActions = {
  createServer,
  fetchUserServer,
  joinServer,
};
