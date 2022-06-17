import { RECEIVE_BUYER_ORDERS } from "../actions/buyerOrders"

export const buyerOrders = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_BUYER_ORDERS:
      return action.orders
    default:
      return state
  }
}
