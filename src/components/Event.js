import { useSelector, useDispatch } from "react-redux"
import { addID, deleteID } from "../reducers/eventChoicesReducer"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import moment from "moment"

const Event = ({ event, isChoice, setEventChoiceError }) => {
  const dispatch = useDispatch()
  const eventChoices = useSelector((state) => state.eventChoices)
  const isChosen = eventChoices.includes(event.id)

  const addEvent = (id) => {
    if (isChosen) {
      dispatch(deleteID(id))
    } else {
      dispatch(addID(id))
    }
  }
  const startTime = moment(event.start)
  const startHour = startTime.hours()
  const startMinute = startTime.minutes() === 0 ? "00" : startTime.minutes()
  const endTime = moment(event.endtime)
  const endHour = endTime.hours()
  const endMinute = endTime.minutes() === 0 ? "00" : endTime.minutes()
  const Month = startTime.month() + 1
  const EventDate = startTime.date()
  return (
    <Col
      xs={12}
      sm={{ span: 10, offset: 1 }}
      md={{ span: 8, offset: 2 }}
      className="text-left"
    >
      <h4 className="mb-0 pt-3">
        {EventDate}.{Month}
      </h4>
      <Card className="mb-1 border border-1 border-secondary">
        <Card.Body as={Row} className="align-items-center">
          <Col xs={9}>
            <Card.Text className="mb-0">{event.name} (REKO)</Card.Text>
            <Card.Text className="mb-0">{event.address}</Card.Text>
            <Card.Text className="mb-0">
              {startHour}:{startMinute}-{endHour}:{endMinute}
            </Card.Text>
          </Col>
          <Col xs={3}>
            {isChoice ? (
              <Form.Check
                type="switch"
                id={`event-switch-${event.id}`}
                onChange={() => {
                  addEvent(event.id)
                  setEventChoiceError && setEventChoiceError(false)
                }}
                checked={eventChoices.includes(event.id)}
              />
            ) : null}
          </Col>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Event
