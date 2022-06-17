import { RECEIVE_MARKETS } from "../actions/markets"

export const markets = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_MARKETS:
      return action.markets
    default:
      return state
  }
}
