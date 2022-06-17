import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"

const OrdersBuyerNav = ({ navLink, navHeader, altText }) => (
  <Col xs={12}>
    <Nav className="mt-2 py-2 flex-nowrap align-items-center">
      <Nav.Item>
        <Nav.Link as={Link} to={navLink} aria-label={altText}>
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
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="flex-grow-1 pt-2 text-center" style={{ paddingRight: 52 }}>
        <h2>{navHeader}</h2>
      </Nav.Item>
    </Nav>
  </Col>
)

export default OrdersBuyerNav
