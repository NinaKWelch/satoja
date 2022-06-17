import moment from "moment"

const EventInfo = ({ market, event, omitMarketName, omitDate }) => {
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

  const startTime = `${startDate.hours()}:${
    startDate.minutes() < 10 ? "0" + startDate.minutes() : startDate.minutes()
  }`

  const endTime = `${endDate.hours()}:${
    endDate.minutes() < 10 ? "0" + endDate.minutes() : endDate.minutes()
  }`

  const startDay = weekdays[startDate.day()]

  return (
    market && (
      <>
        {event.event_name && (
          <h3 className="mb-0 lh-1 fs-4 fw-bold text-capitalize text-truncate">
            {event.event_name}
          </h3>
        )}
        {!omitMarketName && market.market_name && (
          <h4 className="mb-2 lh-1 fs-5 fw-bold text-capitalize text-truncate">
            {market.market_name}
          </h4>
        )}
        <address className="mb-0 lh-1 fs-5 text-capitalize-first-letter text-truncate">
          <span className="fw-bold">{market.place}</span>
          <span className="d-block">{market.address}</span>
        </address>
        <time dateTime={event.start} className="d-block border-0 lh-1 fs-5">
          {!omitDate && `${startDay} ${startDate.date()}.${startDate.month() + 1}`}
          <span className="d-block border-0">
            {startTime}-{endTime}
          </span>
        </time>
      </>
    )
  )
}

export default EventInfo
