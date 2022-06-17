import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import OrderSellerProductListItem from "./OrderSellerProductListItem"

const OrderSellerProductList = ({ products, handleCalcTotal }) => {
  // remove product sizes with 0 quantity
  const filterByQuantity = (arr) => {
    const filteredProducts = []
    arr.forEach((item) => {
      const filteredSizes = item.sizes.filter((size) => size.quantity !== 0)
      filteredProducts.push({ ...item, sizes: filteredSizes })
    })
    return filteredProducts
  }

  return (
    <Row className="g-0 mb-3">
      <Col xs={12} className="border-bottom">
        {filterByQuantity(products).map((product, index) => (
          <OrderSellerProductListItem key={index} product={product} />
        ))}
      </Col>
      <Col>Yhteensä:</Col>
      <Col className="ms-auto text-end">{handleCalcTotal(products).toFixed(2) + "€"}</Col>
    </Row>
  )
}

export default OrderSellerProductList
