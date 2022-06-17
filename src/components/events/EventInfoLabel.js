import Card from "react-bootstrap/Card"
import moment from "moment"

const EventInfoLabel = ({ market, event, classes, styles, omitDate }) => {
  console.log(market)
  const startDate = moment(event.start ? event.start : event.event_start)
  const endDate = moment(event.endtime ? event.endtime : event.event_endtime)

  const weekdays = [
    "Sunnuntai",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
    "Lauantai",
  ]

  const startTime =
    startDate.hours() +
    ":" +
    (startDate.minutes() < 10 ? "0" + startDate.minutes() : startDate.minutes())

  const endTime =
    endDate.hours() +
    ":" +
    (endDate.minutes() < 10 ? "0" + endDate.minutes() : endDate.minutes())

  const startDay = weekdays[startDate.day()]

  return (
    market && (
      <Card.Body>
        {market.place && (
          <Card.Text className={classes} style={styles}>
            {market.place}
          </Card.Text>
        )}
        <Card.Text className={classes} style={styles}>
          {" "}
          {market.address}
        </Card.Text>
        {!omitDate && (
          <Card.Text className={classes} style={styles}>
            {startDay} {startDate.date() + "." + (startDate.month() + 1)}
          </Card.Text>
        )}
        <Card.Text className={classes} style={styles}>
          {startTime}-{endTime}
        </Card.Text>
      </Card.Body>
    )
  )
}

export default EventInfoLabel
