import { useDispatch } from "react-redux"
import { signUpByEmail, signUpByFacebook } from "../../actions/onboarding"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SEO from "./SEO"
//import SignUpFacebook from "./SignUpFacebook"
import SignUpForm from "./SignUpForm"

const SignUpRedirect = ({ user }) => {
  const dispatch = useDispatch()

  const createNewUser = (newUser) => dispatch(signUpByEmail(newUser))
  const createNewFacebookUser = (newUser) => dispatch(signUpByFacebook(newUser))

  return (
    <Row as="main" className="pt-5">
      <SEO title="Rekisteröidy" description="Tule mukaan Satoja palveluun" />
      <Col xs={12} className="mb-3 text-center">
        {user ? (
          !user.email ? (
            <h3>Tarkista ja täydennä tietosi</h3>
          ) : (
            <h3>Olet jo kirjautuneena</h3>
          )
        ) : (
          <h3>Rekisteröidy palveluun</h3>
        )}
      </Col>
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
      >
        {/*!user && (
          <>
            <SignUpFacebook />
            <div className="text-center">
              <h4>Tai täydennä tiedot:</h4>
            </div>
          </>
        )*/}
        {((user && !user.email) || !user) && (
          <SignUpForm
            user={user ? user : {}}
            facebookSignUp={user && !user.email ? true : false}
            handleCreateNewUser={createNewUser}
            handleCreateNewFacebookUser={createNewFacebookUser}
          />
        )}
      </Col>
    </Row>
  )
}

export default SignUpRedirect
