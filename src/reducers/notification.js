import {
  NOTIFY_SUCCESS,
  NOTIFY_ERROR,
  NOTIFY_VERIFY,
  CLEAR_NOTIFICATION,
} from "../actions/notification"

export const notification = (state = {}, action) => {
  switch (action.type) {
    case NOTIFY_SUCCESS:
      return { status: "success", message: action.message }
    case NOTIFY_ERROR:
      return { status: "error", message: action.message }
    case NOTIFY_VERIFY:
      return { status: "verify", message: action.message }
    case CLEAR_NOTIFICATION:
      return {}
    default:
      return state
  }
}
