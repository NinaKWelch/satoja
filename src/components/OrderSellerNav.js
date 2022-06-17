import { Link } from "react-router-dom"
import { ReactComponent as LeftArrowIcon } from "../media/arrow-left-circle-fill.svg"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"

const OrderSellerNav = ({ navLink, navHeader, altText, HandleBackButton }) => (
  <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
    <Nav className="d-flex flex-nowrap pt-2">
      <Nav.Item>
        <Nav.Link
          as={Link}
          to={navLink}
          aria-label={altText}
          className="pl-0 text-dark"
          onClick={() => HandleBackButton()}
        >
          <LeftArrowIcon width="42" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item
        className="flex-grow-1 text-center"
        style={{ paddingRight: 58, paddingTop: "0.8rem" }}
      >
        <h2 className="mb-0 text-break">{navHeader}</h2>
      </Nav.Item>
    </Nav>
  </Col>
)

export default OrderSellerNav
