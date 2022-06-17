import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

const PasswordResetButton = () => (
  <Button
    as={Link}
    to="/forgot"
    variant="link"
    type="button"
    size="lg"
    className="m-0 pl-1 py-1 text-decoration-none"
  >
    Unohtuiko salasana?
  </Button>
)

export default PasswordResetButton
