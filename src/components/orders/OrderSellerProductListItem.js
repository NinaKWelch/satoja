import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import OrderSellerProductImage from "./OrderSellerProductImage"
//works for now, since can only cancel entire order, not just one item in it.
const OrderSellerProductListItem = ({ product }) => {
  const isDeleted = product.sizes[0].removed === true

  return (
    <Row className="flex-nowrap g-2 mb-1">
      <OrderSellerProductImage
        image={product.product_image_url}
        category={product.category}
      />
      <Col xs={9}>
        <Row className="g-0">
          <Col
            as="p"
            xs={7}
            className="mb-0 fs-6 text-capitalize-first-letter text-truncate"
          >
            {product.product_name}
          </Col>
          <Col as="p" xs={5} className="mb-0 fs-6 text-end">
            ({product.unit_price.toFixed(2) + "€/" + product.type})
          </Col>
        </Row>
        {product.sizes.map((size, index) => (
          <Row key={index} className="g-0">
            <Col
              as="p"
              xs={7}
              className={`mb-0 fs-6 ${
                isDeleted && "text-decoration-line-through text-danger"
              }`}
            >
              {size.quantity} x {size.size} {product.type}
            </Col>
            <Col
              as="p"
              xs={5}
              className={`mb-0 fs-6 text-end ${
                isDeleted && "text-decoration-line-through text-danger"
              }`}
            >
              {(size.price * size.quantity).toFixed(2) + "€"}
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  )
}

export default OrderSellerProductListItem
