import { HANDLE_LOGIN_MODAL } from "../actions/authedUser"
const initialState = { show: false, signUp: false, facebookSignUp: false }

export const loginModal = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_LOGIN_MODAL:
      return action.modal
    default:
      return state
  }
}
