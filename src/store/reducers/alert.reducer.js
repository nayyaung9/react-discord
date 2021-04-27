import { CLOSE_ALERT_REQUEST, OPEN_ALERT_STATUS } from '../action.types';

const initialState = {
  open: false,
  message: '',
  status: '',
};

export function alertReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_ALERT_REQUEST:
      return {
        ...state,
        open: action.payload,
      };
    case OPEN_ALERT_STATUS:
      return {
        ...state,
        open: action.payload.open,
        message: action.payload.message,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
