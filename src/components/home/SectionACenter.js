import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleLoginModal, signOutAuthedUser } from "../../actions/authedUser"
import { ReactComponent as SignPostBuy } from "../../media/main-navigation/sign-post-buy.svg"
import { ReactComponent as SignPostSell } from "../../media/main-navigation/sign-post-sell.svg"
import { ReactComponent as SignPostSlogan } from "../../media/main-navigation/sign-post-slogan.svg"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"

const SectionACenter = () => {
  const dispatch = useDispatch()
  const signedUser = useSelector(({ signedUser }) => signedUser)

  // show login popup
  const handleShow = () => dispatch(handleLoginModal(true))

  // logout current user and update state
  const logoutUser = () => dispatch(signOutAuthedUser())

  return (
    <Col
      xs={{ span: 10, offset: 1 }}
      sm={{ span: 8, offset: 2 }}
      md={{ span: 4, offset: 0 }}
      style={{ paddingBottom: 75 }}
    >
      <Nav className="mt-5 p-0 justify-content-center align-items-center sign-base">
        <div className="mb-4 sign" aria-label="Renki rekoille">
          <SignPostSlogan />
        </div>
        <Nav.Item className="pr-3">
          <Nav.Link as={Link} to={"/map"} aria-label="Osta lähiruokaa" className="sign">
            <SignPostBuy />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-4 pl-3">
          <Nav.Link as={Link} to={"/home"} aria-label="Myy lähiruokaa" className="sign">
            <SignPostSell />
          </Nav.Link>
          <div className="vertical-line"></div>
        </Nav.Item>
        <div className="sign" aria-label="Renki rekoille">
          {signedUser === false && (
            <Button
              type="button"
              variant="success"
              size="lg"
              onClick={handleShow}
              id="login-button"
            >
              Kirjaudu sisään
            </Button>
          )}
          {signedUser === true && (
            <Button
              type="button"
              variant="danger"
              size="lg"
              onClick={logoutUser}
              id="logout-button"
            >
              Kirjaudu ulos
            </Button>
          )}
        </div>
      </Nav>
      <div className="vertical-line vertical-line-bottom"></div>
    </Col>
  )
}

export default SectionACenter
