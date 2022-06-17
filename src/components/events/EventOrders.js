import { useState, useEffect } from "react"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import EventOrdersProduct from "./EventOrdersProduct"
import EventOrdersOrder from "./EventOrdersOrder"

const EventOrders = ({ orders, outdated, handleOrderToDelete }) => {
  const [orderedProducts, setOrderedProducts] = useState(null)
  const [sortedOrders, setSortedOrders] = useState(null)
  const [activeTab, setActiveTab] = useState("products")
  const [viewOrder, setViewOrder] = useState(null)

  useEffect(() => {
    const getOrdersByProducts = (arr) => {
      let products = []
      let orders = []

      arr.forEach((item) => {
        item.user_orders.forEach((order) => {
          const newOrder = {
            id: item.order_id,
            users_firstname: item.users_firstname,
            users_lastname: item.users_lastname,
            users_email: item.users_email,
            users_phonenumber: item.users_phonenumber,
          }

          const newSize = {
            id: order.size_id,
            quantity: order.quantity,
            size: order.size,
            price: order.price,
            removed: order.removed,
          }

          const newProduct = {
            id: order.product_id,
            product_name: order.product_name,
            product_image_url: order.product_image_url,
            type: order.type,
            sizes: [newSize],
            unit_price: order.unit_price,
            category: order.category || "Muut",
            organic: order.organic || false,
          }

          // ORDERS TAB
          if (orders.length > 0) {
            // check if order has already been added
            const hasOrder = orders.find((order) => order.id === item.order_id)

            if (hasOrder) {
              // check if the same product has already been added to order
              let hasProduct = hasOrder.products.find(
                (product) => product.id === order.product_id
              )

              if (hasProduct) {
                // update products
                const updatedProducts = hasOrder.products.map((product) =>
                  product.id !== order.product_id
                    ? product
                    : { ...product, sizes: [...product.sizes, newSize] }
                )
                // update order by adding new product size
                const updatedOrder = {
                  ...hasOrder,
                  products: updatedProducts,
                }

                orders = orders.map((order) =>
                  order.id !== item.order_id ? order : updatedOrder
                )
              } else {
                // update order by adding new product
                orders = orders.map((order) =>
                  order.id !== item.order_id
                    ? order
                    : { ...order, products: [...order.products, newProduct] }
                )
              }
            } else {
              orders.push({ ...newOrder, products: [newProduct] })
            }
          } else {
            orders.push({ ...newOrder, products: [newProduct] })
          }

          // PRODUCTS TAB
          // do not add removed orders to the products tally
          if (order.removed === false) {
            if (products.length > 0) {
              // check if product has already been added
              let hasProduct = products.find((product) => product.id === order.product_id)

              if (hasProduct) {
                // check if size has already been added
                const hasSize = hasProduct.sizes.find((size) => size.id === order.size_id)
                // check if order has already been added
                // ie. order has different sizes of the same product
                const hasOrder = hasProduct.orders.find(
                  (order) => order.id === item.order_id
                )

                // update reserved quantity of an existing size
                const updatedSize = hasProduct.sizes.map((size) =>
                  size.id !== order.size_id
                    ? size
                    : {
                        ...size,
                        quantity: size.quantity + order.quantity,
                      }
                )
                // update product
                const updatedProduct = {
                  ...hasProduct,
                  sizes: !hasSize ? [...hasProduct.sizes, newSize] : updatedSize,
                  orders: !hasOrder
                    ? [...hasProduct.orders, newOrder]
                    : hasProduct.orders,
                }

                // update products array
                products = products.map((product) =>
                  product.id !== order.product_id ? product : updatedProduct
                )
              } else {
                products.push({ ...newProduct, orders: [newOrder] })
              }
            } else {
              products.push({ ...newProduct, orders: [newOrder] })
            }
          }
        })
      })

      const sortOrdersById = (arr) => arr.sort((a, b) => a.id - b.id)

      setSortedOrders(sortOrdersById(orders))
      setOrderedProducts(products)
    }

    orders && getOrdersByProducts(orders)
  }, [orders])

  // show order in orders tab
  const reviewOrder = (id) => {
    setActiveTab("orders")
    setViewOrder(id)
  }

  // calculate total per product
  const calcTotal = (arr) => {
    let total = 0
    arr.forEach((item) => {
      if (item.sizes.length > 0) {
        const sum = item.sizes.reduce((a, b) => b.price * b.quantity + a, 0)
        if (item.sizes[0].removed === false) {
          total += sum
        }
      } else {
        return
      }
    })

    return total
  }

  return (
    <Tabs
      activeKey={activeTab}
      className="tabs-event-orders"
      onSelect={(eventKey) => setActiveTab(eventKey)}
      fill
    >
      <Tab eventKey="products" title="Tuotteet" className="bg-light">
        {orderedProducts && orderedProducts.length > 0 ? (
          <Row className="g-0 p-2">
            <Col xs={12} className="mb-3">
              {orderedProducts.map((product, index) => (
                <EventOrdersProduct
                  key={index}
                  product={product}
                  handleReviewOrder={reviewOrder}
                />
              ))}
            </Col>
            <Col as="p">Saldo:</Col>
            <Col as="p" className="ms-auto text-end">
              {calcTotal(orderedProducts).toFixed(2) + "€"}
            </Col>
          </Row>
        ) : (
          <div className="py-5 text-center">
            <p>Kaikki tilaukset poistettu</p>
          </div>
        )}
      </Tab>
      <Tab eventKey="orders" title="Tilaukset" className="bg-light">
        {sortedOrders && sortedOrders.length > 0 ? (
          <Accordion
            activeKey={viewOrder}
            onSelect={(eventKey) => setViewOrder(eventKey)}
          >
            {sortedOrders.map((order, index) => (
              <EventOrdersOrder
                key={index}
                order={order}
                outdated={outdated}
                handleCalcTotal={calcTotal}
                handleOrderToDelete={handleOrderToDelete}
              />
            ))}
          </Accordion>
        ) : (
          <div className="py-5 text-center">
            <p>Ei tilauksia</p>
          </div>
        )}
      </Tab>
    </Tabs>
  )
}

export default EventOrders
