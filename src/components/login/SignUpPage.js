import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signUpByEmail, signUpByFacebook } from "../../actions/onboarding"
import { clearNotification } from "../../actions/notification"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplateTopNav from "../TemplateTopNav"
//import FacebookSignUpButton from "./FacebookSignUpButton"
import FormSignUp from "./FormSignUp"
import { getUserFbIdById, getAuthedUser } from "../../services/users"
import NotificationVerify from "../NotificationVerify"
const SignUpPage = ({ user, handleLogin }) => {
  const [facebookUser, setFacebookUser] = useState(false)
  const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => notification)

  useEffect(() => {
    async function checkFbId() {
      var u = await getAuthedUser()
      if (u.id) {
        const facebook_id = await getUserFbIdById(u.id)
        facebook_id ? setFacebookUser(true) : setFacebookUser(false)
      } else if (u.facebook_id) {
        const facebook_id = await getUserFbIdById(u.facebook_id)
        facebook_id ? setFacebookUser(true) : setFacebookUser(false)
      }
    }
    // if user registered via Facebook
    // change schema and update the form
    if (user) {
      checkFbId()
    }
  }, [user, facebookUser])

  const createNewUser = (newUser) => dispatch(signUpByEmail(newUser))
  const createNewFacebookUser = (newUser) => dispatch(signUpByFacebook(newUser))

  return (
    <>
      <NotificationVerify
        show={notification.status === "verify"}
        handleClose={() => dispatch(clearNotification())}
        message={notification.message}
      />
      <Row className="h-100">
        <TemplateTopNav
          navLink="/login"
          altText="Palaa kirjautumissivulle"
          navHeader="Luo tili"
        />
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
        >
          {/* {facebookUser === false && <FacebookSignUpButton handleLogin={handleLogin} />} */}
          <FormSignUp
            user={user}
            handleLogin={handleLogin}
            facebookUser={facebookUser}
            handleCreateNewUser={createNewUser}
            handleCreateNewFacebookUser={createNewFacebookUser}
          />
        </Col>
      </Row>
    </>
  )
}

export default SignUpPage
