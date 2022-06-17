import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventListItem from "./EventListItem"
import moment from "moment"

const EventList = ({ events, linkTo }) => {
  const sortByTime = (eventsArray) => {
    return eventsArray.sort((a, b) => {
      return moment(a.start) - moment(b.start)
    })
  }

  const getEventsByDate = (eventsArray) => {
    const sortedArray = sortByTime(eventsArray)
    const eventsByDate = {}
    sortedArray.forEach((event) => {
      const date = moment(event.start)
      const dateKey =
        "" +
        date.year() +
        (date.month() + 1 < 10 ? "0" + (date.month() + 1) : date.month() + 1) +
        (date.date() + 1 < 10 ? "0" + (date.date() + 1) : date.date() + 1)

      eventsByDate[dateKey] = eventsByDate[dateKey]
        ? eventsByDate[dateKey].concat(event)
        : [event]
    })
    return eventsByDate
  }

  const dateString = (event) => {
    const date = moment(event.start)
    return "" + date.date() + "." + (date.month() + 1) + "." + date.year()
  }

  const eventsByDate = getEventsByDate(events)

  return (
    <Row>
      {Object.keys(eventsByDate).map((day, index) => {
        return (
          <Col xs={12} key={index} className="mb-4">
            <p className="mb-1">{dateString(eventsByDate[day][0])}</p>
            {eventsByDate[day].map((event, index) => (
              <EventListItem
                market={event.market}
                event={event}
                linkTo={linkTo}
                key={index}
              />
            ))}
          </Col>
        )
      })}
    </Row>
  )
}

export default EventList
