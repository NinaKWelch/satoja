import Row from "react-bootstrap/Row"
import Event from "./Event"

const Events = ({
  events,
  setEventChoices,
  eventChoices,
  isChoice,
  setEventChoiceError,
}) => {
  const displayEvents = events.map((event) => (
    <Event
      key={event.id}
      event={event}
      eventChoices={eventChoices}
      setEventChoices={setEventChoices}
      isChoice={isChoice}
      setEventChoiceError={setEventChoiceError}
    />
  ))
  return <Row className="mb-4 flex-column">{displayEvents}</Row>
}

export default Events
