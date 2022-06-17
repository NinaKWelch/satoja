import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { receiveSellerOrders, deleteSellerOrder } from "../../actions/sellerOrders"
import {
  receiveSellerRekoOrders,
  deleteSellerRekoOrder,
} from "../../actions/sellerRekoOrders"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "../TemplatePage"
import TemplatePageLoading from "../TemplatePageLoading"
import EventOrdersOrderCancelPopUp from "../events/EventOrdersOrderCancelPopUp"
import EventInfo from "../events/EventInfo"
import EventOrders from "../events/EventOrders"

export const SellerOrdersEventPage = ({ user }) => {
  const { eventID } = useParams()
  const dispatch = useDispatch()
  const orders = useSelector(({ sellerOrders }) => sellerOrders)
  const rekoOrders = useSelector(({ sellerRekoOrders }) => sellerRekoOrders)
  const [event, setEvent] = useState(null)
  const [orderToDelete, setOrderToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [browserRefresh, setBrowserRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)

    const getEventToShow = (orders, id) => {
      let eventToShow = orders.find((order) => order.event_id === id)

      if (eventToShow) {
        if (!eventToShow.market) {
          // if event has not been stored locally
          // it has to be in this format when shown
          const currentEvent = {
            event_id: eventToShow.event_id,
            event_start: eventToShow.event_start,
            event_endtime: eventToShow.event_endtime,
            market: eventToShow.market,
            orders: eventToShow.events_orders,
            outdated: eventToShow.outdated,
          }

          setEvent(currentEvent)
        } else {
          // if event has been stored locally
          // it has already been formatted
          setEvent(eventToShow)
        }
      }
      setLoading(false)
    }

    if (user) {
      if (orders && orders.length > 0 && rekoOrders && rekoOrders.length > 0) {
        getEventToShow([...orders, ...rekoOrders], Number(eventID))
      } else if (orders || rekoOrders) {
        if (!orders && rekoOrders.length > 0) {
          getEventToShow(rekoOrders, Number(eventID))
        } else if (!rekoOrders && orders.length > 0) {
          getEventToShow(orders, Number(eventID))
        } else {
          setLoading(false)
        }
      } else if (!orders && !rekoOrders && browserRefresh === false) {
        dispatch(receiveSellerOrders(user.id))
        dispatch(receiveSellerRekoOrders(user.id))
        setBrowserRefresh(true)
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [browserRefresh, dispatch, eventID, orders, rekoOrders, user])

  useEffect(() => {
    // show delete confirmation popup
    // when an order has been selected to be deleted
    orderToDelete && setShow(true)
  }, [orderToDelete])

  // delete one whole order
  const deleteOrder = () => {
    const getOrder = (arr, type) =>
      arr.forEach((item) => {
        const selectedOrder = item.orders.find(
          (order) => order.order_id === orderToDelete.id
        )

        if (selectedOrder && type === "REKO") {
          dispatch(deleteSellerRekoOrder(user.id, orderToDelete.id))
        } else if (selectedOrder) {
          dispatch(deleteSellerOrder(user.id, orderToDelete.id))
        }
      })
    // check if order is found in orders or rekoOrders
    orders && getOrder(orders)
    rekoOrders && getOrder(rekoOrders, "REKO")
    setShow(false)
  }

  return (
    <TemplatePage pageHeader="Tilaukset" backLink={true} pageColor="bg-basic">
      <EventOrdersOrderCancelPopUp
        orderId={orderToDelete ? orderToDelete.id : ""}
        show={show}
        handleClose={() => setShow(false)}
        handleDeleteOrder={deleteOrder}
      />
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <Row as="main" className="h-100 mt-3 g-1">
          {event ? (
            <>
              <Col
                xs={{ span: 10, offset: 1 }}
                md={{ span: 8, offset: 2 }}
                className="mb-5 text-center"
              >
                <EventInfo market={event.market} event={event} />
              </Col>
              <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                <EventOrders
                  orders={event.orders}
                  handleOrderToDelete={setOrderToDelete}
                  outdated={event.outdated}
                />
              </Col>
            </>
          ) : (
            <Col xs={12} className="text-center">
              <h4 className="pt-4">
                Tätä sivua ei löytynyt. Ehkä sinulla ei ole tähän tapahtumaan liittyviä
                tilauksia.
              </h4>
            </Col>
          )}
        </Row>
      )}
    </TemplatePage>
  )
}

export default SellerOrdersEventPage
