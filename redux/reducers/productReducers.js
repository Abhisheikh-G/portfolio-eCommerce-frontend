import * as types from "../types";

export const productListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case types.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case types.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case types.PRODUCT_LIST_FAILURE:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
