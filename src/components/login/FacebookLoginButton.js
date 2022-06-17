import Button from "react-bootstrap/Button"

const FacebookLoginButton = ({ handleLogin }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={handleLogin}
      variant="outline-primary"
      size="lg"
      type="button"
      className="mb-3 w-100"
    >
      Kirjaudu Facebookilla
    </Button>
  </a>
)
export default FacebookLoginButton
