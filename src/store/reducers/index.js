import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { alertReducer } from './alert.reducer';
import { serverReducer } from './server.reducer';
import { viewReducer } from './view.reducer';
import { channelReducer } from './channel.reducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  server: serverReducer,
  view: viewReducer,
  channel: channelReducer,
});
