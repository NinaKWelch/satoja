import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import EventOrdersOrderHeader from "./EventOrdersOrderHeader"
import EventOrdersOrderContent from "./EventOrdersOrderContent"

const EventOrdersOrder = ({ order, outdated, handleCalcTotal, handleOrderToDelete }) => (
  <Card className="border-0 border-bottom">
    <Accordion.Toggle as={Card.Header} eventKey={order.id} className="bg-light">
      <EventOrdersOrderHeader
        order={order}
        isDeleted={handleCalcTotal(order.products) === 0}
      />
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={order.id}>
      <EventOrdersOrderContent
        order={order}
        outdated={outdated}
        handleCalcTotal={handleCalcTotal}
        handleOrderToDelete={handleOrderToDelete}
      />
    </Accordion.Collapse>
  </Card>
)

export default EventOrdersOrder
