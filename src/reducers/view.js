import { HANDLE_VIEW } from "../actions/view"

export const view = (state = "", action) => {
  switch (action.type) {
    case HANDLE_VIEW:
      return action.view
    default:
      return state
  }
}
