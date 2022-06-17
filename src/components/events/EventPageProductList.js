import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventPageProductListItem from "./EventPageProductListItem"
import moment from "moment"

const EventPageProductList = ({ productsToShow, market, event }) => {
  // calculate the total amount of products for sale
  /*
  const totalProductsForSale = (items) => {
    let sum = 0

    items.forEach((item) => {
      const total = item.sizes.reduce((a, b) => a + b.quantity, 0)
      sum += total
    })

    return sum
  }
  */

  // set the current time
  const currentTime = moment()
  // calculate the closing time for orders
  const orderClosingTime = (date, hrs) => moment(date).subtract(hrs, "hours")
  // calculate when hour before closing time for orders occurs
  const hourBeforeOrderClosingTime = (date, hrs) =>
    moment(date).subtract(hrs + 1, "hours")

  // check if time to order closes within an hour
  const isClosing = (date, hrs) =>
    currentTime.isBetween(
      hourBeforeOrderClosingTime(date, hrs),
      orderClosingTime(date, hrs)
    )
      ? true
      : false

  // check if time to order has run out
  const isClosed = (date, hrs) =>
    currentTime.isSameOrAfter(orderClosingTime(date, hrs)) ? true : false

  // check if product is sold out
  const isAvailable = (sizes) => sizes.reduce((a, b) => a + b.quantity, 0)

  // this function helps to keep available products at the top of the list
  const checkAvailability = (item) => {
    return isClosed(event.start, item.close_before_event) === false &&
      isAvailable(item.sizes) > 0
      ? true
      : false
  }

  const setMessageIfUnavailable = (item) =>
    isAvailable(item.sizes) === 0 ? "Loppuunmyyty" : "Tilausaika päättynyt"

  const setMessageIfClosing = (item) =>
    isClosing(event.start, item.close_before_event) === true
      ? "Alle tunti tilausaikaa"
      : ""

  const handleClosed = (item) => {
    return {
      ...item,
      sizes: item.sizes.map((size) => {
        return { ...size, quantity: 0 }
      }),
    }
  }

  return (
    <Row className="g-1 g-sm-2">
      {
        /*totalProductsForSale(productsToShow) > 0*/ productsToShow.length > 0 &&
          productsToShow
            .filter((product) => checkAvailability(product) === true)
            .map((product, index) => (
              <EventPageProductListItem
                key={index}
                market={market}
                event={event}
                product={product}
                singleSize={product.sizes.length === 1}
                message={setMessageIfClosing(product)}
                messageType="danger"
              />
            ))
      }
      {
        /*totalProductsForSale(productsToShow) > 0*/ productsToShow.length > 0 &&
          productsToShow
            .filter((product) => checkAvailability(product) === false)
            .map((product, index) => (
              <EventPageProductListItem
                key={index}
                market={market}
                event={event}
                product={
                  isAvailable(product.sizes) === 0 ? product : handleClosed(product)
                }
                singleSize={product.sizes.length === 1}
                message={setMessageIfUnavailable(product)}
                messageType="warning"
                disabled={true}
              />
            ))
      }
      {
        /*totalProductsForSale(productsToShow) === 0*/ productsToShow.length === 0 && (
          <Col xs={12} className="text-center">
            <p>Ei tuotteita myytävänä</p>
          </Col>
        )
      }
    </Row>
  )
}

export default EventPageProductList
