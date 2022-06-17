import { useEffect, useState } from "react"
import { getSellerPaymentOptions } from "../../services/users"
import Row from "react-bootstrap/Row"
import EventPageProductListItem from "../events/EventPageProductListItem"

const CartEventSeller = ({ market, event, seller }) => {
  const [paymentOptions, setPaymentOptions] = useState(null)

  useEffect(() => {
    const getPaymentOptions = () => {
      getSellerPaymentOptions(seller.sellers_id).then((response) => {
        if (response.length > 0) {
          const selectedOptions = response
            .filter((option) => option.selected)
            .map((option) => option.name)
          setPaymentOptions(selectedOptions.join(", "))
        } else {
          setPaymentOptions("Varaudu käteismaksuun")
        }
      })
    }

    seller && !paymentOptions && getPaymentOptions()
  }, [paymentOptions, seller])

  // calculate total price per seller
  const totalPrice = (products) => {
    let total = 0

    products.forEach((product) => {
      product.sizes.forEach((size) => {
        if (size.order_quantity) {
          total += size.order_quantity * size.price
        }
      })
    })

    return total.toFixed(2) + "€"
  }

  return (
    <Row className="mb-3 g-1">
      <h5 className="mb-0 lh-1 text-capitalize">
        Tuottaja:{" "}
        {seller.seller_name
          ? seller.seller_name
          : seller.seller_firstname
          ? seller.seller_firstname + " " + seller.seller_lastname
          : ""}
      </h5>
      <p className="mb-0 lh-1 fs-6 text-bolder">
        Maksutavat: <span className="text-lowercase">{paymentOptions}</span>
      </p>
      <p className="mb-0 lh-1 fs-6 text-bolder">
        Yhteensä: <span className="text-lowercase">{totalPrice(seller.products)}</span>
      </p>
      {seller.products.map((product, index) => (
        <EventPageProductListItem
          key={index}
          market={market}
          event={event}
          product={product}
          singleSize={product.singleSize}
          message={product.message ? product.message : ""}
        />
      ))}
    </Row>
  )
}

export default CartEventSeller
