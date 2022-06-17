import {
  SET_AUTHED_USER,
  CHANGE_SELLER_PHOTO,
  CHANGE_BUYER_PHOTO,
} from "../actions/authedUser"

export const authedUser = (state = null, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.user
    case CHANGE_SELLER_PHOTO:
      return { ...state, sellers_image_url: action.image }
    case CHANGE_BUYER_PHOTO:
      return { ...state, buyers_image_url: action.image }
    default:
      return state
  }
}
