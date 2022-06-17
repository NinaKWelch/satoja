import { RECEIVE_BUYER_REKO_ORDERS } from "../actions/buyerRekoOrders"

export const buyerRekoOrders = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_BUYER_REKO_ORDERS:
      return action.rekoOrders
    default:
      return state
  }
}
