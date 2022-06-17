import Button from "react-bootstrap/Button"

const LoginFacebook = () => (
  <a href="api/auth/facebook">
    <Button variant="outline-primary" size="lg" type="button" className="mb-3 w-100">
      Kirjaudu Facebookilla
    </Button>
  </a>
)

export default LoginFacebook
