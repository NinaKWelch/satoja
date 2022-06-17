import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProductCard from "../products/ProductCard"

const EventSellerPageProducts = ({ products }) => {
  const getPrice = (product) => {
    const sigleSize = product.sizes.length === 1

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

  const checkAvailability = (sizes) => sizes.reduce((a, b) => a + b.quantity, 0)

  return (
    <Row className="g-1">
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <Col key={index} xs={12}>
            <ProductCard product={product}>
              <h5
                as="h6"
                className={`mb-1 fs-6 text-capitalize text-truncate ${
                  checkAvailability(product.sizes) === 0 ? "text-secondary" : "text-muted"
                }`}
              >
                {product.seller_name
                  ? product.seller_name
                  : product.seller_firstname + " " + product.seller_lastname}
              </h5>
              <h4
                as="h5"
                className={`mb-0 pr-2 text-capitalize-first-letter text-truncate ${
                  checkAvailability(product.sizes) === 0 ? "text-secondary" : "text-dark"
                }`}
              >
                {product.name}
              </h4>
              <p
                className={`mb-0 ${
                  checkAvailability(product.sizes) === 0 ? "text-secondary" : "text-dark"
                }`}
              >
                {getPrice(product)}
                <span className="d-block fs-6 text-warning">
                  {checkAvailability(product.sizes) === 0 && "Loppuunmyyty"}
                </span>
              </p>
            </ProductCard>
          </Col>
        ))}
    </Row>
  )
}

export default EventSellerPageProducts
