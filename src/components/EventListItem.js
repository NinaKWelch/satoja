import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import EventInfoLabel from "./events/EventInfoLabel"

const EventListItem = ({ market, event, linkTo }) => {
  return (
    <Card
      className="mb-1 py-2 px-2 text-decoration-none text-body"
      as={Link}
      to={{
        pathname: event.id ? `/events/${event.id}` : `/events/${event.event_id}`,
        state: { event: event, market: market, linkTo: linkTo },
      }}
    >
      <EventInfoLabel market={market} event={event} classes="mb-0" omitDate={true} />
    </Card>
  )
}

export default EventListItem
