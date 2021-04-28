import { CHANGE_SERVER_VIEW, CHANGE_CHANNEL_VIEW } from "../action.types";

const changeServerView = (view) => async (dispatch) => {
  return dispatch({ type: CHANGE_SERVER_VIEW, payload: view });
};

const changeChannelView = (view) => async (dispatch) => {
  return dispatch({ type: CHANGE_CHANNEL_VIEW, payload: view });
};

export const viewActions = {
  changeServerView,
  changeChannelView,
};
