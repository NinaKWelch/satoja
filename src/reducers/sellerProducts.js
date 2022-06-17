import { RECEIVE_SELLER_PRODUCTS } from "../actions/sellerProducts"

export const sellerProducts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SELLER_PRODUCTS:
      return action.products
    // TODO: add product
    // TODO: delete product
    // TODO: update product
    default:
      return state
  }
}
