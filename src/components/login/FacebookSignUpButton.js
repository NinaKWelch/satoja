import Button from "react-bootstrap/Button"

const FacebookSignUpButton = ({ handleLogin }) => (
  <a href="api/auth/facebook">
    <Button
      onClick={handleLogin}
      variant="outline-primary"
      size="lg"
      type="button"
      className="mb-3 w-100"
    >
      Rekisteröidy Facebookilla
    </Button>
  </a>
)

export default FacebookSignUpButton
