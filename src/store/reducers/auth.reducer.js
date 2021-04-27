import { SAVE_AUTH_USER_DATA } from "../action.types";

const Storage = (userData) => {
  localStorage.setItem(
    "auth",
    JSON.stringify(Object.keys(userData).length > 0 ? userData : [])
  );
};

export const saveAuthUser = (userData) => {
  Storage(userData);
};

const storage = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : [];

const initialState = {
  isAuth: Object.keys(storage).length > 0 ? true : false,
  user: storage,
  ...saveAuthUser(storage),
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_AUTH_USER_DATA:
      return {
        ...state,
        isAuth: Object.keys(action.payload).length > 0 ? true : false,
        user: action.payload,
        ...saveAuthUser(action.payload),
      };
    default:
      return state;
  }
}
