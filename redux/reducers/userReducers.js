import * as types from "../types";

const userFromLocalStorage =
  typeof window !== "undefined" && localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

export const userLoginReducer = (
  state = { userInfo: userFromLocalStorage },
  { type, payload }
) => {
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return { loading: true };
    case types.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case types.USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case types.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.USER_REGISTER_REQUEST:
      return { loading: true };
    case types.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload };
    case types.USER_REGISTER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case types.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case types.USER_DETAILS_SUCCESS:
      return { loading: false, user: payload };
    case types.USER_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case types.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: payload };
    case types.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload };
    case types.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
