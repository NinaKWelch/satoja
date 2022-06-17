import { RECEIVE_SELLER_EVENTS } from "../actions/sellerEvents"

export const sellerEvents = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SELLER_EVENTS:
      return { ...state, [action.sellerID]: action.events }
    default:
      return state
  }
}
