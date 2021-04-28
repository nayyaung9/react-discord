import { CHANGE_SERVER_VIEW } from "../action.types";

const initialState = {
  activeServer: {},
};

export function viewReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SERVER_VIEW:
      return {
        ...state,
        activeServer: action.payload,
      };
    default:
      return state;
  }
}
