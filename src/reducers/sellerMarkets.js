import { RECEIVE_SELLER_MARKETS } from "../actions/sellerMarkets"

export const sellerMarkets = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SELLER_MARKETS:
      return action.markets
    default:
      return state
  }
}
