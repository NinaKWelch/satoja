import { useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import TemplateTopNav from "../TemplateTopNav"
import FormLogin from "./FormLogin"
//import FacebookLoginButton from "./FacebookLoginButton"
import NotificationError from "../NotificationError"

const LoginPage = ({ user, handleLogin }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <NotificationError
        show={show}
        handleClose={() => setShow(false)}
        delay={5000}
        message="Tapahtui virhe. Tarkista sähköposti ja salasana."
      />
      <Row className="h-100">
        <TemplateTopNav
          navLink="/"
          altText="Palaa kotisivulle"
          navHeader="Kirjaudu palveluun"
        />
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
        >
          {/* <FacebookLoginButton handleLogin={handleLogin} /> */}
          <FormLogin
            user={user}
            handleLogin={handleLogin}
            handleError={() => setShow(true)}
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
    </>
  )
}

export default LoginPage
