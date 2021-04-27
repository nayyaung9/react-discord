import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { alertReducer } from './alert.reducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
});
