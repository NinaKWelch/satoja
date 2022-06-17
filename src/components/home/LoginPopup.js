import { useDispatch, useSelector } from "react-redux"
import { handleLoginModal } from "../../actions/authedUser"
import Modal from "react-bootstrap/Modal"
import SignUp from "./SignUp"
import Login from "./Login"

// loginStatus has 3 boolean parameters: show, signUp, facebookSignUp
// if show is true, the popup is shown (default view: login form)
// if signUp is true, popup shows sign up form
// if facebookSignUp is true, user may need to complete sign up form (email)
// use dispatch(handleLoginModal(show, signUp, facebookSignUp)) to change these values

const LoginPopup = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ authedUser }) => authedUser)
  const loginStatus = useSelector(({ loginModal }) => loginModal)

  // hide login popup
  // and set it to login view
  const hideLogin = () => dispatch(handleLoginModal(false, false, false))

  return (
    <Modal show={loginStatus.show} onHide={hideLogin}>
      <Modal.Header closeButton>
        {loginStatus.signUp && (
          <button
            type="button"
            className="m-0 p-0 border-0 bg-white"
            area-label="Kirjaudu sisään"
            onClick={() => dispatch(handleLoginModal(true, false, false))}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        )}
        <Modal.Title className={loginStatus.signUp ? "ml-auto" : "ml-auto pl-4"}>
          {loginStatus.signUp
            ? loginStatus.facebookSignUp
              ? "Tarkista ja täydennä tietosi"
              : "Rekisteröidy"
            : "Kirjaudu sisään"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loginStatus.signUp ? (
          <SignUp user={user ? user : {}} facebookSignUp={loginStatus.facebookSignUp} />
        ) : (
          <Login
            handleSignUp={() => dispatch(handleLoginModal(true, true, false))}
            handleHideLogin={hideLogin}
          />
        )}
      </Modal.Body>
    </Modal>
  )
}

export default LoginPopup
