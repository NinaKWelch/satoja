import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import AddToCartButtons from "./AddToCartButtons"

const ProductPageSize = ({
  eventId,
  singleSize,
  handleAddToCart,
  handleRemoveFromCart,
  unit,
  size,
}) => {
  const cart = useSelector((state) => state.shoppingCart)
  const [inCart, setInCart] = useState(null)

  useEffect(() => {
    // check if product has been added to cart
    const updateCart = () => {
      // the size id may be either id or size_id
      let size_id = size.id ? size.id : size.size_id
      const eventOrders = cart.find((order) => Number(order.event_id) === Number(eventId))

      if (eventOrders) {
        const batch = eventOrders.batches.find((batch) => batch.size_id === size_id)

        batch ? setInCart(batch.order_quantity) : setInCart(0)
      } else {
        setInCart(0)
      }
    }
    !inCart && updateCart()
  }, [cart, inCart, eventId, size])

  const handleAdd = (size) => {
    handleAddToCart(size)
    let num = inCart + 1
    setInCart(num)
  }

  const handleRemove = (size) => {
    handleRemoveFromCart(size)
    let num = inCart - 1
    setInCart(num)
  }

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
        <AddToCartButtons
          handleRemoveFromCart={handleRemove}
          handleAddToCart={handleAdd}
          size={size}
          inCart={inCart}
          minHeight={60}
        />
      </Col>
    </Row>
  )
}

export default ProductPageSize
