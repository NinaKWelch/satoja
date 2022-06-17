import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ReactComponent as PlusIcon } from "../../media/plus-circle-fill.svg"
import { ReactComponent as DashIcon } from "../../media/dash-circle-fill.svg"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const ProductPageListButtons = ({
  eventID,
  addToCart,
  removeFromCart,
  size,
  unit,
  singleSize,
}) => {
  const cart = useSelector((state) => state.shoppingCart)
  const [inCart, setInCart] = useState(0)

  useEffect(() => {
    const updateCart = () => {
      const eventOrders = cart.find((order) => Number(order.event_id) === Number(eventID))

      if (eventOrders) {
        const batch = eventOrders.batches.find((batch) => batch.size_id === size.size_id)
        batch ? setInCart(batch.order_quantity) : setInCart(0)
      } else {
        setInCart(0)
      }
    }
    updateCart()
  }, [cart, eventID, size])

  const handleMessage = (num, total) => {
    switch (total) {
      case 0:
        return "Loppuunmyyty"
      case num:
        return `Vain ${size.quantity} jäljellä`
      default:
        return ""
    }
  }

  return (
    <Row className="g-0 flex-nowrap align-items-center">
      <Col className="flex-grow-1 fs-5">
        <p
          className={`mb-0 pl-1 lh-1 ${
            size.quantity > 0 ? "text-default" : "text-secondary"
          }`}
        >
          {singleSize
            ? size.price.toFixed(2) + "€ / " + size.unit + unit
            : size.price.toFixed(2) + "€ - " + size.unit + unit}
          <span
            className={
              size.quantity > 0
                ? inCart === size.quantity
                  ? "d-block text-danger fs-6"
                  : ""
                : "d-block text-warning fs-6"
            }
          >
            {handleMessage(inCart, size.quantity)}
          </span>
        </p>
      </Col>
      <Col style={{ maxWidth: 146 }}>
        <Row className="g-0 flex-nowrap align-items-center" style={{ height: 60 }}>
          <Col className="text-start">
            <Button
              size="sm"
              variant="link"
              className={`p-1 ${size.quantity > 0 ? "text-dark" : "text-secondary"}`}
              onClick={(e) => inCart > 0 && removeFromCart(size)}
            >
              <DashIcon width="28" />
            </Button>
          </Col>
          <Col className=" text-center fs-5">
            <span className={size.quantity > 0 ? "text-default" : "text-secondary"}>
              {inCart}
            </span>
          </Col>
          <Col className="text-end">
            <Button
              size="sm"
              variant="link"
              className={`p-1 ${size.quantity > 0 ? "text-dark" : "text-secondary"}`}
              onClick={(e) => inCart < size.quantity && addToCart(size)}
            >
              <PlusIcon width="28" />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ProductPageListButtons
