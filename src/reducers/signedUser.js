import { HANDLE_SIGNED_USER } from "../actions/authedUser"

export const signedUser = (state = false, action) => {
  switch (action.type) {
    case HANDLE_SIGNED_USER:
      return action.status
    default:
      return state
  }
}
