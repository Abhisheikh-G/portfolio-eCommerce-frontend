import * as types from "../types";

const cartItemsFromLocalStorage =
  typeof window !== "undefined" && localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const shippingAddressFromLocalStorage =
  typeof window !== "undefined" && localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

export const cartReducer = (
  state = {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  { type, payload }
) => {
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
    case types.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      };
    case types.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case types.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    default:
      return state;
  }
};
