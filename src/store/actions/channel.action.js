import api from "../../api";
import {
  FETCH_SERVER_CHANNELS,
  ADD_CHANNEL_TO_SERVER,
  USER_SERVERS_LIST,
  CHANGE_SERVER_VIEW,
} from "../action.types";

const fetchServerChannels = (serverId) => async (dispatch) => {
  await api
    .get(`/api/channel/${serverId}`)
    .then((res) => {
      const { data } = res.data;
      dispatch({ type: FETCH_SERVER_CHANNELS, payload: data });
    })
    .catch((err) => {
      console.log("err", err.response);
    });
};

const createChannel = (payload) => async (dispatch) => {
  await api
    .post(`/api/channel/new`, payload)
    .then((res) => {
      const { data } = res.data;
      dispatch({ type: ADD_CHANNEL_TO_SERVER, payload: data });
    })
    .catch((err) => {
      console.log("err", err.response);
    });
};

const deleteChannel = (channelId) => async (dispatch, getStore) => {
  const userId = getStore().auth.user._id;

  await api
    .delete(`/api/channel/${channelId}/delete`)
    .then(async (res) => {
      await api
        .get(`/api/server/${userId}`)
        .then((res) => {
          const { data } = res.data;
          dispatch({ type: USER_SERVERS_LIST, payload: data });
          dispatch({ type: CHANGE_SERVER_VIEW, payload: data[0] });
        })
        .catch((err) => { });
    })
    .catch((err) => {
      console.log("err", err.response);
    });
};
export const channelActions = {
  fetchServerChannels,
  createChannel,
  deleteChannel,
};
