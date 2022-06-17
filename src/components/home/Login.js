import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signInAuthedUser } from "../../actions/authedUser"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
//import LoginFacebook from "./LoginFacebook"
import LoginForm from "./LoginForm"

const Login = ({ handleSignUp, handleHideLogin }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  // login user with email and password
  const checkCredentials = (credentials) => {
    credentials.email = credentials.email.toString().toLowerCase()
    dispatch(signInAuthedUser(credentials))
  }

  // if user forgot their password
  // close popup and redirect to forgot page
  const getNewPassword = () => {
    handleHideLogin()
    history.push("/forgot")
  }

  return (
    <Row className="h-100">
      <Col xs={12}>
        {/*<LoginFacebook />
        <div className="text-center">
          <h4>Tai kirjautumistiedoillasi:</h4>
        </div>*/}
        <LoginForm
          handleSignUp={handleSignUp}
          handleCheckCredentials={checkCredentials}
          handleGetNewPassword={getNewPassword}
        />
      </Col>

      <Col xs={12} className="mt-auto pb-2 text-center">
        <a
          href="https://satoja.fi/dokumentit/tietosuojaseloste.html"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="link">Tietosuoja</Button>
        </a>
      </Col>
    </Row>
  )
}

export default Login
