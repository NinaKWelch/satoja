import {
  getAuthedUser,
  updateAuthedSeller,
  updateAuthedBuyer,
  updateSellerImage,
  updateBuyerImage,
  createSeller,
} from "../services/users"
import { getSeller } from "../services/sellers"
import { loginUser, logoutUser } from "../services/auth"
import { NOTIFY_SUCCESS, NOTIFY_ERROR } from "./notification"

export const SET_AUTHED_USER = "SET_AUTHED_USER"
export const CHANGE_SELLER_PHOTO = "CHANGE_SELLER_PHOTO"
export const CHANGE_BUYER_PHOTO = "CHANGE_BUYER_PHOTO"
export const HANDLE_LOGIN_MODAL = "HANDLE_LOGIN_MODAL"
export const HANDLE_SIGNED_USER = "HANDLE_SIGNED_USER"

// fetch data asychroniously from the server
// and set state with redux-thunk
// https://redux.js.org/tutorials/essentials/part-5-async-logic

// open and clse the login popup
export const handleLoginModal = (show, signUp, facebookSignUp) => {
  let modal = {
    show,
    signUp,
    facebookSignUp,
  }

  return {
    type: "HANDLE_LOGIN_MODAL",
    modal,
  }
}

// assign or deny access to features
// based on sign up status
export const handleSignedUser = (status) => {
  return {
    type: "HANDLE_SIGNED_USER",
    status,
  }
}

// get signed in user
export const setAuthedUser = () => async (dispatch) => {
  const user = await getAuthedUser()

  user && user.status !== 500
    ? dispatch({ type: "SET_AUTHED_USER", user })
    : dispatch({ type: "SET_AUTHED_USER", user: null })
}

// login user
export const signInAuthedUser = (credentials) => async (dispatch) => {
  const status = await loginUser(credentials)

  if (status === 200) {
    dispatch(setAuthedUser())
  } else if (status === 401) {
    dispatch({
      type: NOTIFY_ERROR,
      message: "Virheellinen sähköposti tai salasana.",
    })
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Kirjautuminen epäonnistui." })
  }
}

// logout user
export const signOutAuthedUser = () => async (dispatch) => {
  const status = await logoutUser()

  if (status === 200) {
    dispatch(handleSignedUser(false))
    dispatch({ type: "SET_AUTHED_USER", user: null })
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Uloskirjautuminen epäonnistui" })
  }
}

// logout user who has not confirmed their email
export const signOutUnauthedUser = () => async (dispatch) => {
  const status = await logoutUser()

  if (status === 200) {
    dispatch({ type: "SET_AUTHED_USER", user: null })
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Peruutus epäonnistui" })
  }
}

// add seller info to the current user (seller profile page)
export const getSellerInfo = (user) => async (dispatch) => {
  const data = await getSeller(user.id)

  const seller = {
    ...user,
    name: data.name || "",
    address: data.address || "",
    zipcode: data.zipcode || "",
    city: data.city || "",
    business_id: data.business_id || "",
    homepage: data.homepage || "",
    description: data.description || "",
    //salesreport_check: data.salesreport_check,
  }

  data
    ? dispatch({ type: "SET_AUTHED_USER", user: seller })
    : dispatch({ type: NOTIFY_ERROR, message: "Profiilitietojen tuonti epäonnistui" })
}

// update seller
export const updateSellerProfile = (user) => async (dispatch) => {
  //console.log("updateSellerProfile ", user)
  if (!user.is_seller) {
    createSeller(user.id, user)
  }
  const status = await updateAuthedSeller(user)

  if (status === 200) {
    dispatch({ type: "SET_AUTHED_USER", user })
    dispatch({ type: NOTIFY_SUCCESS, message: "Profiilitiedot päivitetty" })
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Profiilin päivitys epäonnistui" })
  }
}

// update buyer
export const updateBuyerProfile = (user) => async (dispatch) => {
  const status = await updateAuthedBuyer(user)

  if (status === 200) {
    dispatch({ type: "SET_AUTHED_USER", user })
    dispatch({ type: NOTIFY_SUCCESS, message: "Profiilitiedot päivitetty" })
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Profiilin päivitys epäonnistui" })
  }
}

// update seller's profile photo
export const changeSellerPhoto = (id, image_id) => async (dispatch) => {
  const status = await updateSellerImage(id, image_id)

  status === 200
    ? dispatch({ type: "CHANGE_SELLER_PHOTO", image: image_id })
    : dispatch({ type: NOTIFY_ERROR, message: "Kuvan lataaminen epäonnistui" })
}

// update buyer's profile photo
export const changeBuyerPhoto = (id, image_id) => async (dispatch) => {
  const status = await updateBuyerImage(id, image_id)

  status === 200
    ? dispatch({ type: "CHANGE_BUYER_PHOTO", image: image_id })
    : dispatch({ type: NOTIFY_ERROR, message: "Kuvan lataaminen epäonnistui" })
}
