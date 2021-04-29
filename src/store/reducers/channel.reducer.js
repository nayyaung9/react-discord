import _ from "lodash";
import { FETCH_SERVER_CHANNELS } from "../action.types";

const initialState = {
  channels: [],
};

export function channelReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVER_CHANNELS:
      return {
        ...state,
        channels: {
          ..._.mapKeys(action.payload, "uniqueId"),
        },
      };
    default:
      return state;
  }
}
