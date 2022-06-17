import { createNewUser } from "../services/auth"
//import { updateAuthedBuyer } from "../services/users"
import { createNewFacebookUser } from "../services/users"
import { NOTIFY_VERIFY, NOTIFY_ERROR } from "./notification"
import { SET_AUTHED_USER } from "./authedUser"

// email
export const signUpByEmail = (newUser) => async (dispatch) => {
  newUser.email = newUser.email.toLowerCase()
  //remove whitespace
  for (var [key, value] of Object.entries(newUser)) {
    var temp = value.replaceAll(" ", "")
    newUser[key] = temp
  }

  const response = await createNewUser(newUser)

  if (response.status === 200 || response === 200) {
    dispatch({
      type: NOTIFY_VERIFY,
      message: "Tarkista sähköpostisi. Lähetimme sinulle vahvistusviestin.",
    })
  } else if (response.status === 400) {
    // show error message i.e. account with same email already exists
    dispatch({
      type: NOTIFY_ERROR,
      message: "Tällä sähköpostilla on olemassaoleva tili.",
    })
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Rekisteröityminen epäonnistui." })
  }
}

// Facebook
export const signUpByFacebook = (newUser) => async (dispatch) => {
  //  const response = await updateAuthedBuyer(newUser) //why on earth did i change from createNewFacebookUser to updateautherbuyer? - R
  const response = await createNewFacebookUser(newUser)

  if (response.status === 200 || response === 200) {
    dispatch({ type: SET_AUTHED_USER, user: newUser })
  } else {
    dispatch({
      type: NOTIFY_ERROR,
      message: "Rekisteröityminen Facebookin kautta epäonnistui",
    })
  }
}
