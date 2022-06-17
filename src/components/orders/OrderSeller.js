import { useEffect, useState } from "react"
import { getSellerPaymentOptions } from "../../services/users"
import Col from "react-bootstrap/Col"
import OrderSellerProductList from "./OrderSellerProductList"

const OrderSeller = ({ seller, handleCalcTotal }) => {
  const [paymentOptions, setPaymentOptions] = useState(null)

  useEffect(() => {
    const getPaymentOptions = () => {
      getSellerPaymentOptions(seller.seller_id).then((response) => {
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

    !paymentOptions && getPaymentOptions()
  }, [paymentOptions, seller.seller_id])

  const isDeleted = seller.seller_products[0].sizes[0].removed === true

  return (
    <Col xs={12}>
      <h5 className="mb-0 text-capitalize">
        Tuottaja:{" "}
        {seller.seller_name
          ? seller.seller_name
          : seller.seller_firstname + " " + seller.seller_lastname}
      </h5>
      {!isDeleted ? (
        <p className="fs-6 text-bolder">
          Maksutavat: <span className="text-lowercase">{paymentOptions}</span>
        </p>
      ) : (
        <p className="fs-6 text-bolder text-danger">
          {seller.seller_products.length === 1 &&
          seller.seller_products[0].sizes.length === 1
            ? "Tämä tuote on poistettu"
            : "Nämä tuotteet on poistettu"}
        </p>
      )}
      <OrderSellerProductList
        products={seller.seller_products}
        handleCalcTotal={handleCalcTotal}
      />
    </Col>
  )
}

export default OrderSeller
