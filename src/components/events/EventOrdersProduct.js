import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import OrderSellerProductListItem from "../orders/OrderSellerProductListItem"

const EventOrdersProduct = ({ product, handleReviewOrder }) => {
  // calculate total for product
  const calcTotal = (arr) => arr.reduce((a, b) => b.price * b.quantity + a, 0)
  // sort orders by id
  const sortedOrders = (arr) => arr.sort((a, b) => a.id - b.id)

  return (
    <Row className="g-0">
      <Col xs={12} className="border-bottom">
        <OrderSellerProductListItem product={product} />
      </Col>
      <Col>Yhteensä:</Col>
      <Col className="ms-auto text-end">{calcTotal(product.sizes).toFixed(2) + "€"}</Col>
      <Col xs={12}>
        Tilaukset:{" "}
        {sortedOrders(product.orders).map((order, index) => (
          <Button
            key={index}
            variant="link"
            onClick={() => handleReviewOrder(order.id)}
            className="fs-6 py-0 px-1"
            aria-label="katso tilaus"
          >
            {order.id}
            {index !== product.orders.length - 1 && ", "}
          </Button>
        ))}
      </Col>
    </Row>
  )
}

export default EventOrdersProduct
