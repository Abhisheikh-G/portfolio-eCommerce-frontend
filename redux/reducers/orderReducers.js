import * as types from "../types";

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.ORDER_CREATE_REQUEST:
      return { loading: true };
    case types.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: payload };
    case types.ORDER_CREATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
