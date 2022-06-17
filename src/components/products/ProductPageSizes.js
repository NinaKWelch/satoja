import Col from "react-bootstrap/Col"
import ProductPageSize from "./ProductPageSize"

const ProductPageSizes = ({
  eventId,
  product,
  singleSize,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  return (
    <Col
      xs={12}
      sm={{ span: 8, offset: 2 }}
      md={{ span: 10, offset: 1 }}
      className="mb-3 mt-md-4"
    >
      <div className="text-center">
        {!singleSize && (
          <h5>
            {parseFloat(product.unit_price).toFixed(2).toString().replace(".", ",")}€ /{" "}
            {product.type}
          </h5>
        )}
      </div>
      {product.sizes.map((size, index) => (
        <ProductPageSize
          key={index}
          eventId={eventId}
          singleSize={singleSize}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          unit={product.type}
          size={size}
        />
      ))}
    </Col>
  )
}

export default ProductPageSizes
