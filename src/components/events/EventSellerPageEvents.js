import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Event from "./Event"
import moment from "moment"

const EventSellerPageEvents = ({ sellerQueryName, sellerName, events, error }) => {
  const sortByClosestFirst = (arr) =>
    arr.sort((a, b) => moment(a.start) - moment(b.start))

  return (
    <div>
      <h3 className="fs-4">Noutotilaisuudet</h3>
      <p className="fs-6 lh-0">
        <strong className="text-capitalize">{sellerName}</strong> myy tuotteitaan näissä
        tilaisuuksissa.
      </p>
      <Row>
        {events &&
          events.length > 0 &&
          sortByClosestFirst(events).map((event, index) => (
            <Event
              key={index}
              event={event}
              linkTo={`/events/${event.event_id}?name=${
                sellerQueryName ? sellerQueryName : "kaikkituottajat"
              }&category=kaikkituotekategoriat`}
              width="100%"
            />
          ))}
        <Col xs={12}>
          {error && (
            <p className="text-danger">
              Noutotilaisuuksien haku palvelimelta epännistui. Kokeile myöhemmin uudellen.
            </p>
          )}
          {!events && error === false && <p>Ei tulevia noutotilaisuuksia</p>}
        </Col>
      </Row>
    </div>
  )
}

export default EventSellerPageEvents
