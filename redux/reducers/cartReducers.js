import * as types from "../types";

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case types.CART_ADD_ITEM:
      const item = payload;
      const existItem = state.cartItems.find(
        (inCart) => inCart.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((inCart) =>
            inCart.product === existItem.product ? item : inCart
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    default:
      return state;
  }
};
