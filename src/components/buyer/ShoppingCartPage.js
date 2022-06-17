import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import productService from "../../services/products"
import {
  removeProductsFromCart,
  removeProductFromCart,
  submitOrders,
} from "../../actions/shoppingCart"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "../TemplatePage"
import TemplatePageLoading from "../TemplatePageLoading"
import CartEvent from "../cart/CartEvent"
import CartOrder from "../cart/CartOrder"
import CartNotification from "../cart/CartNotification"
import moment from "moment"

const ShoppingCartPage = ({ user, signedUser }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const cart = useSelector(({ shoppingCart }) => shoppingCart)
  const [totalPrice, setTotalPrice] = useState(0)
  const [dispatchOrder, setDispatchOrder] = useState(false)
  const [orderSent, setOrderSent] = useState(false)
  const [orderOutdated, setOrderOutdated] = useState(false)
  const [orderChanges, setOrderChanges] = useState(null)

  useEffect(() => {
    // calculate cost of items
    // in the shopping cart
    const getTotalPrice = () => {
      const total = cart.reduce(
        (acc, order) =>
          acc +
          order.batches.reduce(
            (acc, batch) =>
              acc + batch.order_quantity * batch.unit * batch.product.unit_price,
            0
          ),
        0
      )
      return total
    }

    setTotalPrice(getTotalPrice() || 0)
  }, [cart])

  useEffect(() => {
    dispatchOrder &&
      cart.length > 0 &&
      dispatch(submitOrders(cart, user.id)) &&
      setOrderSent(true)
  }, [cart, dispatch, dispatchOrder, user])

  useEffect(() => {
    // if order was successful
    // take the buyer to the orders page
    orderSent && cart.length === 0 && history.push("/orders/buyer")
  }, [cart, history, orderSent])

  // check that the time to order each product has not passed
  const handleOutdatedOrders = () => {
    let outdated = 0

    // set the current time
    const currentTime = moment()
    // calculate the closing time for orders
    const orderClosingTime = (date, hrs) => moment(date).subtract(hrs, "hours")
    // check if time to order has run out
    const isClosed = (date, hrs) =>
      currentTime.isSameOrAfter(orderClosingTime(date, hrs)) ? true : false

    for (let item of cart) {
      const event = item.event
      // remove all products whose order time has expired from the cart
      for (let batch of item.batches) {
        if (isClosed(event.start, batch.product.close_before_event)) {
          dispatch(removeProductFromCart(batch.product, batch, event))
          outdated = outdated + 1
        }
      }

      if (outdated > 0) {
        // notify the buyer before sending the order
        // if some products can no loger be  are ouorder time has expired
        setOrderOutdated(true)
        // scroll to the top
        window.scrollTo(0, 0)
      } else {
        setDispatchOrder(true)
      }
    }
  }

  // check that all products are still available
  const handleOrder = async () => {
    let changes = []
    //let dispatchOrders = false
    for (let item of cart) {
      const event = item.event

      for (let batch of item.batches) {
        // check current product availability by size
        await productService.getProductById(batch.product.id).then((product) => {
          const size = product.sizes.find((size) => size.id === batch.size_id)
          if (size.quantity < batch.order_quantity) {
            dispatch(removeProductsFromCart(batch.product, batch, event, size.quantity))
            changes.push({
              id: batch.product.id,
              size_id: batch.size_id,
              quantity: size.quantity,
              unit: batch.unit,
            })
          }
        })
      }

      if (changes.length > 0) {
        // notify the buyer before sending the order
        // if the quantity of available product is less than ordered
        setOrderChanges(changes)
        // scroll to the top
        window.scrollTo(0, 0)
      } else {
        /// if no changes were made
        // check that all products are still available to order
        // or has the time to order passed
        handleOutdatedOrders()
        //dispatchOrders = true
      }
    }
    /*
    if (dispatchOrders === true) {
      dispatch(submitOrders(cart, user.id))
      setOrderSent(true)
    }
    */
  }

  // check the total number of products in cart
  const checkTotalOrders = (arr) => {
    let totalOrders = 0

    arr.forEach((item) => {
      totalOrders += item.batches.reduce((a, b) => a + b.order_quantity, 0)
    })

    return totalOrders
  }

  return (
    <TemplatePage pageHeader="Ostoskori" pageColor="bg-basic">
      {cart ? (
        <Row as="main" className="g-0 mt-4" style={{ paddingBottom: 87 }}>
          {(cart.length === 0 || (!orderChanges && checkTotalOrders(cart) === 0)) && (
            <CartNotification>
              <p>Ostoskorisi on tyhjä.</p>
              <p>
                Löydät noutotilaisuuksia{" "}
                <Link to="/map" className="text-white">
                  karttasivulta.
                </Link>
              </p>
            </CartNotification>
          )}
          {orderChanges && checkTotalOrders(cart) === 0 && (
            <CartNotification>
              {cart.length === orderChanges.length && (
                <p>
                  {cart.length > 1
                    ? "Yksikään varaamistasi tuotteista ei ole saatavilla."
                    : "Varaamasi tuote ei ole saatavilla."}
                </p>
              )}
              <p>
                Valitse toinen koko (jos valittavissa) tai palaa{" "}
                <Link to="/map" className="text-white">
                  karttasivulle
                </Link>{" "}
                löytääksesi uusia tuotteita.
              </p>
            </CartNotification>
          )}
          {orderChanges && checkTotalOrders(cart) > 0 && (
            <CartNotification>
              <p>Joitain tuotteita oli jäljellä vähemmän kuin varaamasi määrä.</p>
              <p>Tarkista tilauksesi ja lähetä varaus uudelleen.</p>
            </CartNotification>
          )}
          {orderOutdated && checkTotalOrders(cart) > 0 && (
            <CartNotification>
              <p>Olemme postaneet ne tuotteet, joiden tilausaika on umpeutunut.</p>
            </CartNotification>
          )}
          {!orderChanges && !orderOutdated && checkTotalOrders(cart) > 0 && (
            <CartNotification>
              <p>Tuotteet maksetaan tilaisuudessa suoraan tuottajalle.</p>
              <p>Varmista että tuottajan ilmoittama maksutapa sopii sinulle.</p>
            </CartNotification>
          )}
          {cart.length > 0 &&
            cart.map((item, index) => (
              <Col xs={12} key={index}>
                <CartEvent
                  event={item.event}
                  products={item.batches}
                  orderChanges={orderChanges}
                />
              </Col>
            ))}
        </Row>
      ) : (
        <TemplatePageLoading />
      )}
      {cart && totalPrice > 0 && (
        <CartOrder
          signedUser={signedUser}
          totalPrice={totalPrice}
          handleOrder={handleOrder}
        />
      )}
    </TemplatePage>
  )
}

export default ShoppingCartPage
