import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { receiveSellerOrders } from "../../actions/sellerOrders"
import { receiveSellerRekoOrders } from "../../actions/sellerRekoOrders"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import TemplatePage from "../TemplatePage"
import TemplatePageLoading from "../TemplatePageLoading"
import Event from "../events/Event"

const SellerOrdersPage = ({ user }) => {
  const dispatch = useDispatch()
  const orders = useSelector(({ sellerOrders }) => sellerOrders)
  const rekoOrders = useSelector(({ sellerRekoOrders }) => sellerRekoOrders)
  const [upcomingOrders, setUpcomingOrders] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  const [showPastOrders, setShowPastOrders] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setLoading(true)
      dispatch(receiveSellerOrders(user.id))
      dispatch(receiveSellerRekoOrders(user.id))
    }
  }, [dispatch, user])

  useEffect(() => {
    const sortOrdersByOutdated = (arr) => {
      const current = arr.filter((item) => item.outdated === false)
      const past = arr.filter((item) => item.outdated === true)
      current.sort((a, b) => new Date(a.event_start) - new Date(b.event_start))
      past.sort((a, b) => new Date(b.event_start) - new Date(a.event_start))

      current.length > 0 && setUpcomingOrders(current)
      past.length > 0 && setPastOrders(past)
      setLoading(false)
    }

    // combine orders and rekoOrders into one array
    if (orders || rekoOrders) {
      if (!orders) {
        sortOrdersByOutdated(rekoOrders)
      } else if (!rekoOrders) {
        sortOrdersByOutdated(orders)
      } else {
        sortOrdersByOutdated([...orders, ...rekoOrders])
      }
    } else {
      setLoading(false)
    }
  }, [loading, orders, rekoOrders])

  return (
    <TemplatePage pageHeader="Tilaukset" pageColor="bg-basic">
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <Row as="main" className="h-100 mt-4">
          <Col
            xs={12}
            md={{ span: 10, offset: 1 }}
            lg={{ span: 8, offset: 2 }}
            className="mb-3"
          >
            {upcomingOrders.length > 0 ? (
              <Row>
                {upcomingOrders.map((event, index) => (
                  <Event
                    key={index}
                    event={event}
                    linkTo={`/orders/seller/${event.event_id}`}
                  />
                ))}
              </Row>
            ) : (
              <div className="text-center">
                <p>Ei saapuneita tilauksia</p>
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
                {showPastOrders
                  ? "Piilota menneet tilaisuudet"
                  : "Katso menneet tilaisuudet"}
              </Button>
              <Row>
                {showPastOrders &&
                  pastOrders.map((event, index) => (
                    <Event
                      key={index}
                      event={event}
                      linkTo={`/orders/seller/${event.event_id}`}
                    />
                  ))}
              </Row>
            </Col>
          )}
        </Row>
      )}
    </TemplatePage>
  )
}

export default SellerOrdersPage
