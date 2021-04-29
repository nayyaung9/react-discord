import _ from "lodash";
import { USER_SERVERS_LIST,  } from "../action.types";

const initialState = {
  servers: [],
};

export function serverReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SERVERS_LIST:
      return {
        ...state,
        servers: {
          ..._.mapKeys(action.payload, "uniqueId"),
        },
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
