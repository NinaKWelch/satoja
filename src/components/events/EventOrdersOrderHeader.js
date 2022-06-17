import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const EventOrdersOrderHeader = ({ order, isDeleted }) => (
  <Row style={{ cursor: "pointer" }}>
    <Col className="fw-bolder">
      {order.users_lastname
        ? order.users_firstname
          ? `${order.users_firstname} ${order.users_lastname}`
          : `${order.users_lastname}`
        : ""}
    </Col>
    <Col
      className={`text-end pe-auto ${
        isDeleted && "text-decoration-line-through text-danger"
      }`}
    >
      {order.id}
    </Col>
  </Row>
)

export default EventOrdersOrderHeader
