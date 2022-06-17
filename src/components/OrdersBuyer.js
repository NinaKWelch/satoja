import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { receiveBuyerOrders } from "../actions/buyerOrders"


import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import OrdersBuyerEventListItem from "./OrdersBuyerEventListItem"
import moment from "moment"


const OrdersBuyer = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.authedUser)
  const orders = useSelector((state) => state.buyerOrders)
 
  useEffect(() => {
    if (user) {
      dispatch(receiveBuyerOrders(user.id))
    }
  }, [dispatch, user])

  const sortByTime = (eventsArray) => {
    return eventsArray.sort((a, b) => {
      return moment(a.event_start) - moment(b.event_start)
    })
  }

  const currentDate = moment()

  const sortByCurrentOrders = (eventsArray) => {
    const currentOrders = eventsArray.filter((event) =>
      moment(event.event_start).isAfter(currentDate)
    )

    return sortByTime(currentOrders)
  }

  const sortByPastOrders = (eventsArray) => {
    const pastOrders = eventsArray.filter((event) =>
      moment(event.event_start).isBefore(currentDate)
    )

    return sortByTime(pastOrders)
  }

  const sortEventsByDate = (eventsArray, current) => {
    //const sortedArray = sortByTime(eventsArray)
    const sortedArray = current
      ? sortByCurrentOrders(eventsArray)
      : sortByPastOrders(eventsArray)
    const eventsByDate = {}
    sortedArray.forEach((event) => {
      const date = moment(event.event_start)
      //oisko onkelma tässä härpäkkeessä.
      // const dateKey =
      //   "" +
      //   date.getFullYear() +
      //   (date.month() + 1 < 10 ? "0" + (date.month() + 1) : date.month() + 1) +
      //   (date.date() + 1 < 10 ? "0" + (date.date() + 1) : date.date() + 1)

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

  const eventsByFutureDate = sortEventsByDate(combinedOrders, true)
  const eventsByPastDate = sortEventsByDate(combinedOrders, false)

  // Group all orders related to the same event under that event to avoid
  // duplicates in the event list. Returned object contains { datestring: { eventID: [orders] }}
  const combineOrdersPerEvent = (eventsSortedByDate) => {
    let sorted = {}
    Object.keys(eventsSortedByDate).forEach((key) => {
      if (!sorted[key]) sorted[key] = {}
      eventsSortedByDate[key].forEach((order) => {
        if (!sorted[key][order.event_id]) sorted[key][order.event_id] = []
        sorted[key][order.event_id].push(order)
      })
    })
    return sorted
  }

  const upcomingOrdersByDateAndEvent = combineOrdersPerEvent(eventsByFutureDate)
  const pastOrdersByDateAndEvent = combineOrdersPerEvent(eventsByPastDate)

  return (
    <Row className="h-100 mb-5 bg-light-green">
      <Col xs={12} className="pt-5 text-center">
        <h2>Noudot</h2>
      </Col>
      {eventsByFutureDate && (
        <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <div className="text-center">
            <h3>Tulevat noudot</h3>
          </div>
          {orders &&
            Object.keys(upcomingOrdersByDateAndEvent).map((date, index) => {
              return (
                <Row key={index} className="mb-2 px-2 flex-column">
                  <Col className="pl-0">
                    {/*<p className="mb-1">{dateString(eventsByFutureDate[date][0])}</p>*/}
                  </Col>
                  {Object.keys(upcomingOrdersByDateAndEvent[date]).map(
                    (eventID, index) => (
                      <OrdersBuyerEventListItem
                        event={upcomingOrdersByDateAndEvent[date][eventID][0]}
                        orders={upcomingOrdersByDateAndEvent[date][eventID]}
                        key={index}
                      />
                    )
                  )}
                </Row>
              )
            })}
        </Col>
      )}
      {!eventsByFutureDate && (
        <Col xs={12} className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      )}
      {eventsByPastDate && (
        <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <div className="text-center">
            <h3>Menneet noudot</h3>
          </div>
          {orders &&
            Object.keys(pastOrdersByDateAndEvent).map((date, index) => {
              return (
                <Row key={index} className="mb-2 px-2 flex-column">
                  <Col className="pl-0">
                    {/*<p className="mb-1">{dateString(eventsByPastDate[date][0])}</p>*/}
                  </Col>
                  {Object.keys(pastOrdersByDateAndEvent[date]).map((eventID, index) => (
                    <OrdersBuyerEventListItem
                      event={pastOrdersByDateAndEvent[date][eventID][0]}
                      orders={pastOrdersByDateAndEvent[date][eventID]}
                      key={index}
                    />
                  ))}
                </Row>
              )
            })}
        </Col>
      )}
      {!eventsByPastDate && (
        <Col xs={12} className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      )}
    </Row>
  )
}

export default OrdersBuyer
