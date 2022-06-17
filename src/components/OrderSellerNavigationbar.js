import Nav from "react-bootstrap/Nav"

const OrderSellerNavigationBar = (props) => (
  <Nav fill variant="tabs" defaultActiveKey={props.navBarValue} className="mx-1">
    <Nav.Item className="btn-rounded-top btn-light-gray">
      <Nav.Link
        onClick={props.HandleProductButton}
        eventKey={"product"}
        className="text-decoration-none"
      >
        Tuotteet
      </Nav.Link>
    </Nav.Item>
    <Nav.Item className="btn-rounded-top btn-light-gray">
      <Nav.Link
        onClick={props.HandleOrderButton}
        eventKey={"order"}
        className="text-decoration-none"
      >
        Tilaajat
      </Nav.Link>
    </Nav.Item>
  </Nav>
)

export default OrderSellerNavigationBar
