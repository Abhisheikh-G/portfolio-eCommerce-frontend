import * as types from "../types";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const res = await fetch(`http://localhost:5000/api/products/${id}`);
  const data = await res.json();

  console.log(data);

  dispatch({
    type: types.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: types.CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: types.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (pMethod) => async (dispatch) => {
  dispatch({
    type: types.CART_SAVE_PAYMENT_METHOD,
    payload: pMethod,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(pMethod));
};
