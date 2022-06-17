import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signInAuthedUser } from "../../actions/authedUser"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
//import LoginFacebook from "./LoginFacebook"
import LoginForm from "./LoginForm"

const LoginPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  // login user with email and password
  const checkCredentials = (credentials) => {
    credentials.email = credentials.email.toString().toLowerCase()
    dispatch(signInAuthedUser(credentials))
  }

  // if user forgot their password
  // redirect to forgot page
  const getNewPassword = () => {
    history.push("/forgot")
  }

  // redirect to register page
  const goToSignUpPage = () => {
    history.push("/register")
  }

  return (
    <Row as="section" className="g-0 mt-4 p-4 bg-white border rounded">
      <Col xs={12} className="mb-3 text-center">
        <h3 className="mb-4">Kirjaudu palveluun</h3>
        {/*<LoginFacebook />
        <div className="text-center">
          <h4>Tai kirjautumistiedoillasi:</h4>
        </div>*/}
        <LoginForm
          handleSignUp={goToSignUpPage}
          handleCheckCredentials={checkCredentials}
          handleGetNewPassword={getNewPassword}
        />
      </Col>
    </Row>
  )
}

export default LoginPage
