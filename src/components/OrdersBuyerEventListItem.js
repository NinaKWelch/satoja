import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import EventInfoLabel from "./events/EventInfoLabel"

const OrdersBuyerEventListItem = ({ event, orders }) => {
  return (
    <Card
      className="mb-2 p-2 text-decoration-none text-body"
      as={Link}
      to={{
        pathname: `/orders/buyer/${event.event_id}`,
        state: { event: event, orders: orders },
      }}
    >
      <EventInfoLabel
        market={event.market}
        event={event}
        classes="mb-0"
        omitDate={true}
      />
    </Card>
  )
}

export default OrdersBuyerEventListItem
