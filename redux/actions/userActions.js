import * as types from "../types";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGIN_REQUEST });

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(`http://localhost:5000/api/users/login`, {
      method: "post",
      headers: config.headers,
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 401) {
      throw new Error("Invalid email or password.");
    }

    const data = await res.json();

    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? err.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: types.USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_REGISTER_REQUEST });

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "post",
      headers: config.headers,
      body: JSON.stringify({ name, email, password }),
    });

    if (res.status === 400) {
      throw new Error("That email address is already taken.");
    }

    const data = await res.json();

    dispatch({
      type: types.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? err.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
      {
        method: "get",
        headers: config.headers,
      }
    );

    if (res.status > 399) {
      throw new Error("There was an error doing that.");
    }

    const data = await res.json();

    dispatch({
      type: types.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? err.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
      {
        method: "put",
        headers: config.headers,
        body: JSON.stringify(user),
      }
    );

    if (res.status > 399) {
      throw new Error("There was an error doing that.");
    }

    const data = await res.json();

    dispatch({
      type: types.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? err.response.data.message
          : error.message,
    });
  }
};
