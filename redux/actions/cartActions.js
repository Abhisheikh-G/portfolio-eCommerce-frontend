import * as types from "../types";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const res = await fetch(`http://localhost:5000/api/products/${id}`);
  const data = res.json();

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

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems())
  );
};
