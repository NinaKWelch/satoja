import Col from "react-bootstrap/Col"

const CartNotification = ({ children }) => (
  <Col
    as="section"
    xs={12}
    className="mb-4 border rounded pt-4 px-4 pb-2 text-center bg-dark text-white"
    //style={{ backgroundColor: "rgb(255, 250, 193)" }}
  >
    {children}
  </Col>
)

export default CartNotification
