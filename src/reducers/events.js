import { RECEIVE_EVENTS, UPDATE_EVENTS, ADD_EVENT, UPDATE_EVENT } from "../actions/events"

export const events = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.events
    case UPDATE_EVENTS:
      if (state && state.length > 0 && action.event !== []) {
        return state.map((event) => (event.id !== action.event.id ? event : action.event))
      } else {
        return [action.event]
      }
    case ADD_EVENT:
      // add event to state
      return [...state, action.event]
    case UPDATE_EVENT:
      // find current event to update
      const event = state.find((event) => event.id === action.event.id)

      if (event) {
        // update products
        return state.map((event) => (event.id !== action.event.id ? event : action.event))
      } else {
        return state
      }
    default:
      return state
  }
}
