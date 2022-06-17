import Col from "react-bootstrap/Col"
import EventCard from "./EventCard"
import moment from "moment"

const Event = ({ event, linkTo, width }) => {
  const dateString = (event) => {
    const startDate = moment(event.start ? event.start : event.event_start)
    return `${startDate.date()}.${startDate.month() + 1}.${startDate.year()}`
  }

  return (
    <Col xs={12} sm={width && width === "100%" ? 12 : 6} className="mb-4">
      <p className="mb-0">{dateString(event)}</p>
      <EventCard event={event} linkTo={linkTo} />
    </Col>
  )
}

export default Event
