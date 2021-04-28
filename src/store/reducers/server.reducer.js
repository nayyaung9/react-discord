import { USER_SERVERS_LIST } from '../action.types';

const initialState = {
  servers: []
};

export function serverReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SERVERS_LIST:
      return {
        ...state,
        servers: action.payload,
      };
    default:
      return state;
  }
}
