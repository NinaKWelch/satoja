import "../App.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAuthedUser } from "../actions/authedUser"
import { clearNotification } from "../actions/notification"
import NotificationSuccess from "./NotificationSuccess"
import NotificationError from "./NotificationError"
import NotificationVerify from "./NotificationVerify"
import NotificationGDPR from "./NotificationGDPR"
import LoginPopup from "./home/LoginPopup"
import Routes from "./home/Routes"

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => notification)
  const authedUser = useSelector(({ authedUser }) => authedUser)
  const signedUser = useSelector(({ signedUser }) => signedUser)
  const loginModal = useSelector(({ loginModal }) => loginModal)
  const [gdpr, setGdpr] = useState(false)

  // set current user
  useEffect(() => {
    dispatch(setAuthedUser())
  }, [dispatch])

  useEffect(() => {
    let modal = { show: false, signUp: false, facebookSignUp: false }

    // check that registration has been completed (Facebook)
    authedUser &&
      authedUser.email &&
      dispatch({ type: "HANDLE_SIGNED_USER", status: true })

    // close modal if registration is incomplete (Facebook)
    authedUser &&
      !authedUser.email &&
      loginModal.show === true &&
      dispatch({ type: "HANDLE_LOGIN_MODAL", modal })

    // close modal if open and user is found
    // and notify user when login has been successful via popup
    if (authedUser) {
      loginModal.show === true && dispatch({ type: "HANDLE_LOGIN_MODAL", modal })
      loginModal.show === true &&
        authedUser.email &&
        dispatch({ type: "NOTIFY_SUCCESS", message: "Olet nyt kirjautunut palveluun." })
    }
  }, [authedUser, dispatch, loginModal.show])

  return (
    <div>
      <NotificationError
        show={notification.status === "error"}
        handleClose={() => dispatch(clearNotification())}
        delay={1000}
        message={notification.message}
      />
      <NotificationSuccess
        show={notification.status === "success"}
        handleClose={() => dispatch(clearNotification())}
        delay={1000}
        message={notification.message}
      />
      <NotificationVerify
        show={notification.status === "verify"}
        handleClose={() => dispatch(clearNotification())}
        delay={1000}
        message={notification.message}
      />
      <LoginPopup />
      <Routes user={authedUser} signedUser={signedUser} />
      <NotificationGDPR
        show={gdpr === false && !authedUser}
        handleClose={() => setGdpr(true)}
      />
    </div>
  )
}

export default App
