import { getSellerPaymentOptions, updateSellerPaymentOptions } from "../services/users"
import { NOTIFY_ERROR } from "./notification"

export const SET_SELLER_PAYMENT_OPTIONS = "SET_SELLER_PAYMENT_OPTIONS"

export const setPaymentOptions = (id) => async (dispatch) => {
  // default selection
  const tempOptions = [
    { name: "Kortti", selected: false },
    { name: "Käteinen", selected: false },
    { name: "MobilePay", selected: false },
  ]

  try {
    // get user's payment options
    const options = await getSellerPaymentOptions(id)

    // if the options array is empty, set default selection
    options.length === 0
      ? dispatch({ type: "SET_SELLER_PAYMENT_OPTIONS", options: tempOptions })
      : dispatch({ type: "SET_SELLER_PAYMENT_OPTIONS", options })
  } catch (err) {
    dispatch({
      type: NOTIFY_ERROR,
      message: "Maksutapojen haku palvelimelta epäonnistui",
    })
  }
}

// update seller
export const updatePaymentOptions = (id, options) => async (dispatch) => {
  const status = await updateSellerPaymentOptions(id, options)

  status === 200
    ? dispatch({ type: "SET_SELLER_PAYMENT_OPTIONS", options })
    : dispatch({ type: NOTIFY_ERROR, message: "Maksutapojen päivitys epäonnistui" })
}
