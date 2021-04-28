import { CHANGE_SERVER_VIEW } from "../action.types";

const changeServerView = (view) => async (dispatch) => {
  return dispatch({ type: CHANGE_SERVER_VIEW, payload: view });
};
export const viewActions = {
  changeServerView,
};
