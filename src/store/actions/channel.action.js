import api from "../../api";
import { FETCH_SERVER_CHANNELS } from "../action.types";

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
    .then(async () => {
      await api
        .get(`/api/server/${payload.userId}`)
        .then((res) => {
          const { data } = res.data;
          dispatch({ type: FETCH_SERVER_CHANNELS, payload: data });
        })
        .catch((err) => {
          console.log("err", err.response);
        });
    })
    .catch((err) => {
      console.log("err", err.response);
    });
};

export const channelActions = {
  fetchServerChannels,
  createChannel,
};
