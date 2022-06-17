import Col from "react-bootstrap/Col"

const OrderSellerTimeHeader = (props) => (
  <Col xs={12} className="py-4 text-center">
    <h4 className="mb-0">{props.Order.reko_name}</h4>
    <p className="mb-0">
      {props.datepaiva} {props.thisDate}.{props.month}.
    </p>
    <p className="mb-0">
      {props.dateHourStart}:{props.dateMinutesStart} - {props.dateHourEnd}:
      {props.dateMinutesEnd}
    </p>
    <p>{props.Order.event_address}</p>
  </Col>
)

export default OrderSellerTimeHeader
