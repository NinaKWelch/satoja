import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"

const BackButtonHeader = ({ linkTo }) => (
  <Col xs={{ span: 12, offset: 0 }} className="mb-4 text-center">
    <Nav className="py-2">
      <Nav.Item>
        <Button
          variant="light"
          size="lg"
          className="mr-1"
          aria-label="Return to previous page"
          as={Link}
          to={linkTo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left-square-fill back-link"
            viewBox="0 0 16 16"
          >
            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
          </svg>
        </Button>
      </Nav.Item>
    </Nav>
  </Col>
)

export default BackButtonHeader
