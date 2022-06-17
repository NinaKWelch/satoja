import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signOutAuthedUser, handleLoginModal } from "../../actions/authedUser"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Logo from "../../media/satoja-logo-web.png"

const HomePageNav = ({ signedUser, incompleteRegistration, page }) => {
  const dispatch = useDispatch()

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className="bg-white border-bottom">
      <Navbar.Brand as={Link} to="/">
        <img src={Logo} height="30" className="d-inline-block align-top" alt="Satoja" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {/*<Nav.Link as={Link} to="/map">
            Osta lähiruokaa
          </Nav.Link>
          <Nav.Link as={Link} to={user ? "/home" : "/add"}>
            Myy lähiruokaa
          </Nav.Link>*/}
          {page !== "unknown" && (
            <>
              <Nav.Link href="#home-podcast">Tunne tuottaja podcast</Nav.Link>
              <Nav.Link href="#home-pricing">Hinnasto</Nav.Link>
              <Nav.Link href="#home-contact" className="mr-4">
                Ota yhteyttä
              </Nav.Link>
            </>
          )}
          {incompleteRegistration !== true && (
            <Navbar.Text className="d-none d-lg-block">
              {signedUser ? (
                <Button
                  type="button"
                  variant="link"
                  className="p-0"
                  onClick={() => dispatch(signOutAuthedUser())}
                >
                  Kirjaudu ulos
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0"
                    onClick={() => dispatch(handleLoginModal(true, true, false))}
                  >
                    Rekisteröidy
                  </Button>{" "}
                  /{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0"
                    onClick={() => dispatch(handleLoginModal(true, false, false))}
                  >
                    Kirjaudu sisään
                  </Button>
                </>
              )}
            </Navbar.Text>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default HomePageNav
