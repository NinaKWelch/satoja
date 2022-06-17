import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { addProductToCart, removeProductFromCart } from "../../actions/shoppingCart"
import { ReactComponent as ListIcon } from "../../media/list-ul.svg"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import EventPageProductListItemContent from "./EventPageProductListItemContent"
import AddToCartButtons from "../products/AddToCartButtons"

const EventPageProductListItem = ({
  product,
  event,
  market,
  singleSize,
  message,
  messageType,
  disabled,
}) => {
  const dispatch = useDispatch()
  const cart = useSelector(({ shoppingCart }) => shoppingCart)
  const [inCart, setInCart] = useState(null)

  useEffect(() => {
    // check if product has been added to cart
    const updateCart = () => {
      const eventOrders = cart.find(
        (order) => Number(order.event_id) === Number(event.id)
      )

      if (eventOrders) {
        // the size id may be either id or size_id
        let size_id = product.sizes[0].id ? product.sizes[0].id : product.sizes[0].size_id
        const batch = eventOrders.batches.find((batch) => batch.size_id === size_id)
        batch ? setInCart(batch.order_quantity) : setInCart(0)
      } else {
        setInCart(0)
      }
    }

    !inCart && updateCart()
  }, [cart, inCart, event.id, product])

  const addToCart = (size) => {
    dispatch(
      addProductToCart({ ...product, singleSize }, size, {
        ...event,
        market: market,
      })
    )

    let num = inCart + 1
    setInCart(num)
  }

  const removeFromCart = (size) => {
    dispatch(removeProductFromCart(product, size, { ...event, market: market }))
    let num = inCart - 1
    setInCart(num)
  }

  const getPrice = (product, sigleSize) => {
    if (sigleSize) {
      switch (product.type) {
        case "kg":
          return `${product.sizes[0].price.toFixed(2)} € / ${product.sizes[0].unit} ${
            product.type
          }`
        case "l":
          return `${product.sizes[0].price.toFixed(2)} € / ${product.sizes[0].unit} ${
            product.type
          }`
        default:
          return `${product.unit_price} € / ${product.type}`
      }
    } else {
      return `${product.unit_price} € / ${product.type}`
    }
  }

  // show message if all products have been added to cart
  // together with time limit on order (if applicable)
  // (singleSize only)
  const allInCart = (num, total, message) => {
    switch (total) {
      case 0:
        return message
      case num:
        return message === ""
          ? `Vain ${total} jäljellä`
          : `${message}. Vain ${total} jäljellä`
      default:
        return message !== "" ? message : ""
    }
  }

  return (
    <Col
      xs={12}
      sm={{ span: 8, offset: 2 }}
      md={{ span: 6, offset: 0 }}
      lg={4}
      className="position-relative"
    >
      {disabled ? (
        <EventPageProductListItemContent
          product={product}
          singleSize={singleSize}
          message={message}
          messageType={messageType}
          inCart={inCart}
          handleGetPrice={getPrice}
          handleAllInCart={allInCart}
        />
      ) : (
        <Link
          to={`/events/${event.id ? event.id : event.event_id}/products/${product.id}`}
          aria-label="Katso tuoteseloste"
          className="text-decoration-none text-default"
        >
          <EventPageProductListItemContent
            product={product}
            singleSize={singleSize}
            message={message}
            messageType={messageType}
            inCart={inCart}
            handleGetPrice={getPrice}
            handleAllInCart={allInCart}
          />
        </Link>
      )}
      <div
        className={`position-absolute bottom-0 end-0 ${
          singleSize ? "pr-2 pb-1" : "pr-3 pb-2 text-end"
        }`}
        style={{ minWidth: `${singleSize ? "146px" : "100%"}` }}
      >
        {singleSize && (
          <AddToCartButtons
            handleRemoveFromCart={removeFromCart}
            handleAddToCart={addToCart}
            size={product.sizes[0]}
            inCart={inCart}
          />
        )}
        {!singleSize && !disabled && (
          <Link
            to={`/events/${event.id ? event.id : event.event_id}/products/${product.id}`}
            className={`text-decoration-none fs-5 ${
              message !== "" && messageType === "warning"
                ? "text-secondary"
                : "text-primary"
            }`}
          >
            <ListIcon width="1.25rem" className="pb-1" /> Eri kokoja
          </Link>
        )}
        {!singleSize && disabled && (
          <Button
            variant="link"
            size="lg"
            className="fs-5 p-0 text-secondary text-decoration-none"
            disabled
          >
            <ListIcon width="1.25rem" /> Eri kokoja
          </Button>
        )}
      </div>
    </Col>
  )
}

export default EventPageProductListItem
