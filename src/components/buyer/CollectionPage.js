import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { receiveBuyerOrders } from "../../actions/buyerOrders"
import { receiveBuyerRekoOrders } from "../../actions/buyerRekoOrders"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import TemplatePage from "../TemplatePage"
import TemplatePageLoading from "../TemplatePageLoading"
import Event from "../events/Event"
import moment from "moment"

const CollectionPage = ({ user }) => {
  const dispatch = useDispatch()
  const orders = useSelector(({ buyerOrders }) => buyerOrders)
  const rekoOrders = useSelector(({ buyerRekoOrders }) => buyerRekoOrders)
  const [upcomingOrders, setUpcomingOrders] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  const [showPastOrders, setShowPastOrders] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setLoading(true)
      dispatch(receiveBuyerOrders(user.id))
      dispatch(receiveBuyerRekoOrders(user.id))
    }
  }, [dispatch, user])

  useEffect(() => {
    const currentDate = moment()

    const sortOrdersByDate = (arr) => {
      const futureDates = arr.filter((item) =>
        moment(item.event_start).isAfter(currentDate)
      )

      const pastDates = arr.filter((item) =>
        moment(item.event_endtime).isBefore(currentDate)
      )

      const sortedDates = (arr) =>
        arr.sort((a, b) => moment(a.event_start) - moment(b.event_start))

      if (futureDates.length > 0) {
        futureDates.length === 1
          ? setUpcomingOrders(futureDates)
          : setUpcomingOrders(sortedDates(futureDates))
      }

      if (pastDates.length > 0) {
        pastDates.length === 1
          ? setPastOrders(pastDates)
          : setPastOrders(sortedDates(pastDates))
      }

      setLoading(false)
    }

    // combine orders and rekoOrders into one array
    if (orders && orders.length > 0 && rekoOrders && rekoOrders.length > 0) {
      const combined = [...orders, ...rekoOrders]
      sortOrdersByDate(combined)
    } else if (orders || rekoOrders) {
      if (!orders && rekoOrders.length > 0) {
        sortOrdersByDate(rekoOrders)
      } else if (!rekoOrders && orders.length > 0) {
        sortOrdersByDate(orders)
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [loading, orders, rekoOrders])

  // as there may be many orders for each event
  // this function will sort orders by event
  const sortOrdersByEvents = (arr) => {
    let events = []

    arr.forEach((item) => {
      const newEvent = {
        event_id: item.event_id,
        event_start: item.event_start,
        event_endtime: item.event_endtime,
        event_name: item.event_name || item.place || "",
        description: item.description || "",
        market: {
          address: item.market.address,
          market_description: item.market.market_description || "",
          market_name: item.market.market_name || "",
          place: item.market.place || "",
          region: item.region || "",
        },
        orders: [item],
      }

      if (events.length > 0) {
        const hasEvent = events.find((event) => event.event_id === item.event_id)

        if (hasEvent) {
          events = events.map((event) =>
            event !== hasEvent ? event : { ...event, orders: [...event.orders, item] }
          )
        } else {
          events.push(newEvent)
        }
      } else {
        events.push(newEvent)
      }
    })

    return events
  }

  const sortByLatestFirst = (arr) =>
    arr.sort((a, b) => moment(b.event_start) - moment(a.event_start))

  return (
    <TemplatePage pageHeader="Noudot" pageColor="bg-basic">
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <Row className="g-0 mt-4">
          <Col
            xs={12}
            md={{ span: 10, offset: 1 }}
            lg={{ span: 8, offset: 2 }}
            className="mb-3"
          >
            {upcomingOrders.length > 0 ? (
              <Row>
                {sortOrdersByEvents(upcomingOrders).map((event, index) => (
                  <Event
                    key={index}
                    event={event}
                    linkTo={`/orders/buyer/${event.event_id}`}
                  />
                ))}
              </Row>
            ) : (
              <div className="text-center text-sm-start">
                <p>Ei tulevia noutoja</p>
              </div>
            )}
          </Col>
          {pastOrders.length > 0 && (
            <Col
              xs={12}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 8, offset: 2 }}
              className="mb-4"
            >
              <Button
                variant="dark"
                size="lg"
                className="w-100 mb-4"
                onClick={() => setShowPastOrders(!showPastOrders)}
              >
                {showPastOrders ? "Piilota menneet noudot" : "Katso menneet noudot"}
              </Button>
              <Row>
                {showPastOrders &&
                  sortByLatestFirst(sortOrdersByEvents(pastOrders)).map(
                    (event, index) => (
                      <Event
                        key={index}
                        event={event}
                        linkTo={`/orders/buyer/${event.event_id}`}
                      />
                    )
                  )}
              </Row>
            </Col>
          )}
        </Row>
      )}
    </TemplatePage>
  )
}

export default CollectionPage
