import { RECEIVE_PRODUCTS } from "../actions/products"

export const products = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export const setProducts = (products) => {
  return async (dispatch) => {
    dispatch({ type: "RECEIVE_PRODUCTS", products })
  }
}
