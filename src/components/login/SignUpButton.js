import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

const SignUpButton = () => (
  <Button
    as={Link}
    to="/register"
    variant="outline-success"
    size="lg"
    className="w-100 mb-3"
  >
    Rekisteröidy
  </Button>
)

export default SignUpButton
