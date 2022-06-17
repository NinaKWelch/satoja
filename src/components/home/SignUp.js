import { useDispatch } from "react-redux"
import { signUpByEmail, signUpByFacebook } from "../../actions/onboarding"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
//import SignUpFacebook from "./SignUpFacebook"
import SignUpForm from "./SignUpForm"

const SignUp = ({ user, facebookSignUp }) => {
  const dispatch = useDispatch()

  const createNewUser = (newUser) => dispatch(signUpByEmail(newUser))
  const createNewFacebookUser = (newUser) => dispatch(signUpByFacebook(newUser))

  return (
    <Row className="h-100">
      <Col xs={12}>
        {/*facebookSignUp === false && (
          <>
            <SignUpFacebook />
            <div className="text-center">
              <h4>Tai täydennä tiedot:</h4>
            </div>
          </>
        )*/}
        <SignUpForm
          user={user}
          facebookSignUp={facebookSignUp}
          handleCreateNewUser={createNewUser}
          handleCreateNewFacebookUser={createNewFacebookUser}
        />
      </Col>
    </Row>
  )
}

export default SignUp
