import * as types from "../types";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.ORDER_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: "post",
      headers: config.headers,
      body: JSON.stringify(order),
    });

    const data = await res.json();
    dispatch({
      type: types.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? err.response.data.message
          : error.message,
    });
  }
};
