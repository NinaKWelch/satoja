import { sendMail } from "../services/mail"
import { NOTIFY_SUCCESS, NOTIFY_ERROR } from "./notification"

export const handleMail = (message) => async (dispatch) => {
  const status = await sendMail(message)

  if (status === 200) {
    dispatch({ type: NOTIFY_SUCCESS, message: "Viesti lähetetty" })
    return status
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Viestin lähettäminen epäonnistui" })
  }
}
