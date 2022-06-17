import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import productService from "../../services/products"
import eventService from "../../services/events"
import orderService from "../../services/orders"
import { notifyError } from "../../actions/notification"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "../TemplatePage"
import UpdateProductForm from "./UpdateProductForm"

const UpdateProducts = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(({ authedUser }) => authedUser)
  const { productID } = useParams()
  const [productToUpdate, setProductToUpdate] = useState(null)
  const [events, setEvents] = useState([])
  const [eventSelection, setEventSelection] = useState([])

  useEffect(() => {
    // get all the seller's events with orders
    // and the total orders for the product per event
    const getProductOrders = async (id) => {
      let ordersPerEvent = []

      try {
        // get seller's orders by event
        const eventOrderData = await orderService.getSellerOrders(user.id)

        // loop through orders for each event
        // to calculate the total sales
        // for the product per event
        eventOrderData.forEach((event) => {
          event.events_orders.forEach((order) => {
            const isReserved = order.user_orders.filter((item) => item.product_id === id)
            let total = 0

            if (isReserved.length > 0) {
              if (isReserved.length > 1) {
                total += isReserved.reduce((a, b) => a + b.quantity, 0)
                ordersPerEvent.push({ event_id: event.event_id, reserved: total })
              } else {
                total += isReserved[0].quantity
                ordersPerEvent.push({ event_id: event.event_id, reserved: total })
              }
            }
          })
        })

        return ordersPerEvent
      } catch (err) {
        dispatch(notifyError("Tilausten haku palvelimelta epäonnistui"))
      }
    }

    // create an array of events
    // to be added to a form field
    const createEventSelection = async (product, events) => {
      const orders = await getProductOrders(product.id)

      const selection = []
      if (events.length > 0) {
        events.forEach((obj) => {
          const isSelected = product.events ? product.events.includes(obj.id) : false
          const event = orders.find((order) => order.event_id === obj.id)

          isSelected
            ? selection.push({
                event_id: obj.id,
                selected: true,
                reserved: event ? event.reserved : 0,
              })
            : selection.push({
                event_id: obj.id,
                selected: false,
                reserved: event ? event.reserved : 0,
              })
        })
      }

      // set state for product, events selection (form) and events
      // console.log("product1: ", product)
      setProductToUpdate(product)
      setEventSelection(selection)
      setEvents(events)
    }

    // get user's events from the server
    const getEventData = async (product) => {
      try {
        const eventData = await eventService.getSellersUpcomingEvents(user.id)
        const rekoEventData = await eventService.getSellersUpcomingRekoEvents(user.id)
        let combined = [...eventData, ...rekoEventData]
        combined.sort((a, b) => new Date(a.start) - new Date(b.start))
        createEventSelection(product, combined)
      } catch (err) {
        dispatch(notifyError("Tilaisuuksien haku palvelimelta epäonnistui"))
      }
    }

    // get product to be updated
    const getProductData = async () => {
      try {
        const productData = await productService.getProductById(productID)

        // get upcoming events (if any)
        // and show selected events for product
        getEventData(productData)
      } catch (err) {
        dispatch(notifyError("Tuotteen haku palvelimelta epäonnistui"))
      }
    }

    user && getProductData()
  }, [dispatch, productID, user])

  // update product listing
  const updateProduct = async (product, eventChoices, sizes) => {
    try {
      const status = await productService.updateProduct(productID, {
        product,
        eventChoices,
        sizes,
      })

      status === 200 && history.push("/products")
    } catch (err) {
      dispatch(notifyError("Tuotteen muokkaaminen epäonnistui"))
    }
  }

  return (
    <TemplatePage pageHeader="Muokkaa ilmoitusta" pageColor="bg-basic">
      <Row className="g-2 pt-3">
        <Col xs={12} md={{ span: 6, offset: 3 }} className="pb-4">
          {productToUpdate && (
            <UpdateProductForm
              product={productToUpdate}
              events={events}
              eventSelection={eventSelection}
              handleUpdateProduct={updateProduct}
            />
          )}
        </Col>
      </Row>
    </TemplatePage>
  )
}

export default UpdateProducts
