import { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import DiscoveryListEvent from "./DiscoveryListEvent"
import DiscoveryListSeller from "./DiscoveryListSeller"
import moment from "moment"

const DiscoveryList = ({ markets, sellers, activeMarket, activeSeller }) => {
  const [eventsToShow, setEventsToShow] = useState(null)
  const [showMoreEvents, setShowMoreEvents] = useState(false)

  useEffect(() => {
    // group events by date and
    // show events with the nearest date first
    const getEventsByDate = (arr) => {
      let eventsByDate = []

      for (let item of arr) {
        // get date in yyyy-mm-dd format
        const eventDate = item.start.split("T")[0]

        if (eventsByDate.length > 0) {
          // check if date has already been added
          const hasDate = eventsByDate.find((date) => date.start === eventDate)

          if (!hasDate) {
            // add new date and event
            eventsByDate.push({ start: eventDate, events: [item] })
          } else {
            // add new event to existing date
            eventsByDate = eventsByDate.map((date) =>
              date.start !== eventDate
                ? date
                : { ...date, events: [...date.events, item] }
            )
          }
        } else {
          // add new date and event
          eventsByDate.push({ start: eventDate, events: [item] })
        }
      }

      return eventsByDate
    }

    // sort events by date (nearest first)
    const filterEvents = (events) => {
      const sortedEvents = events.sort((a, b) => moment(a.start) - moment(b.start))
      setEventsToShow(getEventsByDate(sortedEvents))
    }

    // get currenly visible events for markets
    markets &&
      markets.length > 0 &&
      filterEvents(
        markets
          .map((market) => {
            return market.market_events.map((event) => {
              return {
                ...event,
                market: {
                  id: market.id,
                  address: market.address,
                  location: market.location,
                  market_name: market.market_name || "",
                  place: market.place || "",
                  region: market.region_name || "",
                  market_description: market.market_description || "",
                },
              }
            })
          })
          .flat()
      )
  }, [markets])

  if ((!markets || markets.length === 0) && (!sellers || sellers.length === 0)) {
    return (
      <div className="mt-4 text-center">
        Valitsemallasi alueella ei ole yhtään noutotilaisuutta tai tuottajaa.
      </div>
    )
  }

  const dateString = (start) => {
    const date = moment(start)
    return `${date.date()}.${date.month() + 1}.${date.year()}`
  }

  // only show up to first three days events at the start
  // and hide the rest (toggle button)
  const showFirstThree = (arr) => {
    const getLength = (arr, i) => arr[i].events.length

    switch (true) {
      case arr.length > 1 && getLength(arr, 0) > 3:
        return arr.slice(0)
      case arr.length > 2 && getLength(arr, 0) + getLength(arr, 1) > 3:
        return arr.slice(0, 2)
      case arr.length > 3 &&
        getLength(arr, 0) + getLength(arr, 1) + getLength(arr, 2) >= 3:
        return arr.slice(0, 3)
      default:
        return arr
    }
  }

  const hasHiddenEvents = (arr) => arr.length !== showFirstThree(arr).length

  return (
    <Row className="g-0 px-3">
      {markets &&
        markets.length > 0 &&
        eventsToShow &&
        eventsToShow.length > 0 &&
        showFirstThree(eventsToShow).map((date, index) => (
          <Col key={index} xs={12} className="mb-3">
            <p className="mb-0">{dateString(date.start)}</p>
            <Row className="g-2">
              {date.events.map((event, index) => (
                <DiscoveryListEvent
                  key={index}
                  event={event}
                  market={event.market}
                  activeMarket={activeMarket}
                />
              ))}
            </Row>
          </Col>
        ))}
      {showMoreEvents &&
        markets &&
        markets.length > 0 &&
        eventsToShow &&
        hasHiddenEvents(eventsToShow) &&
        eventsToShow.slice(showFirstThree(eventsToShow).length).map((date, index) => (
          <Col key={index} xs={12} className="mb-3">
            <p className="mb-0">{dateString(date.start)}</p>
            <Row className="g-2">
              {date.events.map((event, index) => (
                <DiscoveryListEvent
                  key={index}
                  event={event}
                  market={event.market}
                  activeMarket={activeMarket}
                />
              ))}
            </Row>
          </Col>
        ))}
      {markets && markets.length > 0 && eventsToShow && hasHiddenEvents(eventsToShow) && (
        <Col xs={12} className="mb-3">
          <Button
            variant="dark"
            size="lg"
            className="w-100"
            onClick={() => setShowMoreEvents(!showMoreEvents)}
          >
            {showMoreEvents ? "Katso vähemmän" : "Katso lisää"}
          </Button>
        </Col>
      )}
      {sellers && sellers.length > 0 && (
        <>
          <Col xs={12} className="text-center mb-2">
            <h3 className="fs-4">Tuottajat</h3>
          </Col>
          <Col xs={12}>
            <Row className="g-3">
              {sellers.map((seller, index) => (
                <DiscoveryListSeller
                  key={index}
                  seller={seller}
                  activeSeller={activeSeller}
                />
              ))}
            </Row>
          </Col>
        </>
      )}
    </Row>
  )
}
export default DiscoveryList
