import { CLOSE_ALERT_REQUEST } from '../action.types';

const closeAlert = open => async dispatch => {
  dispatch({ type: CLOSE_ALERT_REQUEST, payload: open });
};

export const alertAction = {
  closeAlert,
};
