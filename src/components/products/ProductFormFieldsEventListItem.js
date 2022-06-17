import { Field } from "formik"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import FormFieldSwitch from "../FormFieldSwitch"
import moment from "moment"

const ProductFormFieldsEventListItem = ({ index, eventInfo }) => {
  // create moment object for event to display datetime (start)
  const eventDate = moment(eventInfo.start)

  const getEventHours = (endDate) => {
    // create moment object for event to display datetime (end)
    const eventEndDate = moment(endDate)
    const setMinutes = (min) => (min === 0 ? "00" : min < 10 ? `0${min}` : min)
    const setHours = (hrs) => (hrs < 10 ? `0${hrs}` : hrs)
    const setTime = (date) => `${setHours(date.hours())}:${setMinutes(date.minutes())}`

    return `${setTime(eventDate)}-${setTime(eventEndDate)}`
  }

  return (
    <>
      <h4 className="mb-0 pt-3">
        {eventDate.date()}.{eventDate.month() + 1}
      </h4>
      <Card className="mb-1 border border-1 border-secondary">
        <Card.Body as={Row} className="align-items-center">
          <Col xs={9}>
            <Card.Text className="mb-0 fw-bold text-capitalize-first-letter text-truncate">
              {eventInfo.event_name}
            </Card.Text>
            {eventInfo.place && (
              <Card.Text className="mb-0 fw-bold text-capitalize-first-letter text-truncate">
                {eventInfo.place}
              </Card.Text>
            )}
            <Card.Text className="mb-0">{eventInfo.address}</Card.Text>
            <Card.Text className="mb-0">{getEventHours(eventInfo.endtime)}</Card.Text>
          </Col>
          <Col xs={3}>
            <Field
              name={`events.${index}.selected`}
              value={`events.${index}.selected`}
              id={`events.${index}.event_id`}
              label="Select event"
              component={FormFieldSwitch}
            />
          </Col>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductFormFieldsEventListItem
