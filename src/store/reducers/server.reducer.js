import _ from "lodash";
import {
  USER_SERVERS_LIST,
  ADD_NEW_SERVER_TO_USER_JOINED,
} from "../action.types";

const initialState = {
  servers: [],
};

export function serverReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SERVERS_LIST:
      return {
        ...state,
        servers: action.payload,
      };
    case ADD_NEW_SERVER_TO_USER_JOINED:
      return {
        ...state,
        servers: [...state.servers, action.payload],
      };
    // case FETCH_CHANNEL_MESSAGES_LIST:
    //   return {
    //     ...state,
    //     servers: {
    //       ...state.servers,
    //       [action.payload.serverId]: {
    //         ...state.servers[action.payload.serverId],
    //         _channels: [
    //           ...state.servers[action.payload.serverId]._channels,
    //           action.payload.channel,
    //         ],
    //       },
    //     },
    //   };
    default:
      return state;
  }
}
