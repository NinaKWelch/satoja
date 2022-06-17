import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { receiveBuyerOrders } from "../../actions/buyerOrders"
import { receiveBuyerRekoOrders } from "../../actions/buyerRekoOrders"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "../TemplatePage"
import TemplatePageLoading from "../TemplatePageLoading"
import EventInfo from "../events/EventInfo"
import OrderCard from "../orders/OrderCard"

const CollectionEventPage = ({ user }) => {
  const dispatch = useDispatch()
  const { eventID } = useParams()
  const buyerOrders = useSelector(({ buyerOrders }) => buyerOrders)
  const buyerRekoOrders = useSelector(({ buyerRekoOrders }) => buyerRekoOrders)
  const [orders, setOrders] = useState([])
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [browserRefresh, setBrowserRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)

    const sortProductsById = (arr) => {
      let products = []

      arr.forEach((item) => {
        const newSize = {
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          removed: item.removed,
        }

        const newProduct = {
          product_id: item.product_id,
          order_date: item.order_date,
          product_image_url: item.product_image_url,
          product_name: item.product_name,
          organic: item.organic,
          type: item.type,
          unit_price: item.unit_price,
          sizes: [newSize],
        }

        if (products.length > 0) {
          const hasProduct = products.find(
            (product) => product.product_id === item.product_id
          )

          if (hasProduct) {
            products = products.map((product) =>
              product.product_id === item.product_id
                ? { ...product, sizes: [...product.sizes, newSize] }
                : product
            )
          } else {
            products.push(newProduct)
          }
        } else {
          products.push(newProduct)
        }
      })
      setLoading(false)

      return products
    }

    const sortProductsBySeller = (arr) => {
      let sellers = []

      arr.forEach((item) => {
        const newProduct = {
          product_id: item.product_id,
          order_date: item.order_date,
          product_image_url: item.product_image_url,
          product_name: item.product_name,
          organic: item.organic,
          type: item.type,
          unit_price: item.unit_price,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          removed: item.removed,
        }

        const newSeller = {
          seller_id: item.seller_id,
          seller_name: item.seller_name || null,
          seller_firstname: item.seller_firstname || null,
          seller_lastname: item.seller_lastname || null,
          seller_products: [newProduct],
        }

        if (sellers.length > 0) {
          const hasSeller = sellers.find((seller) => seller.seller_id === item.seller_id)

          if (hasSeller) {
            sellers = sellers.map((seller) =>
              seller.seller_id === item.seller_id
                ? {
                    ...seller,
                    seller_products: [...seller.seller_products, newProduct],
                  }
                : seller
            )
          } else {
            sellers.push(newSeller)
          }
        } else {
          sellers.push(newSeller)
        }
      })

      sellers = sellers.map((seller) => ({
        ...seller,
        seller_products: sortProductsById(seller.seller_products),
      }))

      return sellers
    }

    // arrage products by order ids
    const sortOrdersByOrderId = (arr) => {
      let orders = {}

      arr.forEach((item) => {
        // chack if order number has already been added
        const hasOrder = Object.keys(orders).includes(item.order_id.toString())

        // add an order date for each product
        // as same product can be ordered
        // at different times for the same event
        const productsWithOrderDate = (arr) => {
          let products = []
          arr.forEach((product) => {
            products.push({ ...product, order_date: item.order_date })
          })
          return products
        }

        const newOrder = {
          [item.order_id]: productsWithOrderDate(item.products),
        }

        if (hasOrder) {
          // update order
          orders = {
            ...orders,
            [item.order_id]: orders[item.order_id].concat(
              productsWithOrderDate(item.products)
            ),
          }
        } else {
          // add new order
          orders = { ...orders, ...newOrder }
        }
      })

      // sort products by seller and product
      let ordersBySellerAndProducts = []

      Object.keys(orders).forEach((key) => {
        const order = {
          id: key,
          sellers: sortProductsBySeller(orders[key]),
        }

        ordersBySellerAndProducts.push(order)
      })

      // update state with sorted orders
      setOrders(ordersBySellerAndProducts)
    }

    const getEventToShow = (orders) => {
      const currentEvent = {
        event_id: orders[0].event_id,
        event_endtime: orders[0].event_endtime,
        event_start: orders[0].event_start,
        event_name: orders[0].event_name,
        market: orders[0].market,
      }

      setEvent(currentEvent)
      sortOrdersByOrderId(orders)
    }

    if (user) {
      // filter orders by event
      // and only show orders related to current event
      const hasEventOrders = (arr) =>
        arr.filter((order) => order.event_id === Number(eventID))

      // check if buyerOrders or buyerRekoOrders exixt for the selected event
      if (buyerOrders && buyerRekoOrders) {
        const combinedOrders = hasEventOrders([...buyerOrders, ...buyerRekoOrders])
        getEventToShow(combinedOrders)
      } else if (buyerOrders || buyerRekoOrders) {
        if (!buyerOrders && hasEventOrders(buyerRekoOrders).length > 0) {
          getEventToShow(hasEventOrders(buyerRekoOrders))
        } else if (!buyerRekoOrders && hasEventOrders(buyerOrders).length > 0) {
          getEventToShow(hasEventOrders(buyerOrders))
        } else {
          setLoading(false)
        }
      } else if (browserRefresh === false) {
        dispatch(receiveBuyerOrders(user.id))
        dispatch(receiveBuyerRekoOrders(user.id))
        setBrowserRefresh(true)
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [browserRefresh, buyerOrders, buyerRekoOrders, dispatch, eventID, user])

  return (
    <TemplatePage pageHeader="Noudot" backLink={true} pageColor="bg-basic">
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <Row as="main">
          {event ? (
            <>
              <Col
                xs={{ span: 10, offset: 1 }}
                md={{ span: 8, offset: 2 }}
                className="mb-5 text-center"
              >
                <EventInfo market={event.market} event={event} />
              </Col>
              <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
                {orders &&
                  orders.length > 0 &&
                  orders.map((order, index) => <OrderCard key={index} order={order} />)}
                {orders.length === 0 && <p>Ei Tilauksia</p>}
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

export default CollectionEventPage
