import { CHANGE_SERVER_VIEW, CHANGE_CHANNEL_VIEW } from "../action.types";

const initialState = {
  activeServer: {},
  activeChannel: {},
};

export function viewReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SERVER_VIEW:
      return {
        ...state,
        activeServer: action.payload,
        activeChannel: action.payload?._channels[0],
      };
    case CHANGE_CHANNEL_VIEW:
      return {
        ...state,
        activeChannel: action.payload,
      };
    default:
      return state;
  }
}
