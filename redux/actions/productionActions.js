import * as types from "../types";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_LIST_REQUEST });
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    console.log(data);
    dispatch({
      type: types.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.PRODUCT_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? err.response.data.message
          : error.message,
    });
  }
};
