import ProductCard from "../products/ProductCard"

const EventPageProductListItemContent = ({
  product,
  singleSize,
  message,
  messageType,
  inCart,
  handleGetPrice,
  handleAllInCart,
}) => {
  return (
    <ProductCard product={product}>
      <h5
        as="h6"
        className={`mb-1 fs-6 text-capitalize text-truncate ${
          message !== "" && messageType === "warning" ? "text-secondary" : "text-muted"
        }`}
      >
        {product.seller_name
          ? product.seller_name
          : product.seller_firstname
          ? product.seller_firstname + " " + product.seller_lastname
          : ""}
      </h5>
      <h4
        as="h5"
        className={`mb-0 pr-2 text-capitalize-first-letter text-truncate ${
          message !== "" && messageType === "warning" ? "text-secondary" : "text-dark"
        }`}
      >
        {product.name}
      </h4>
      <p
        className={`mb-0 ${
          message !== "" && messageType === "warning" ? "text-secondary" : "text-dark"
        }`}
      >
        {handleGetPrice(product, singleSize)}
        {singleSize ? (
          <span
            className={`d-block fs-6 ${
              messageType === "warning" ? "text-warning" : "text-danger"
            }`}
          >
            {handleAllInCart(inCart, product.sizes[0].quantity, message)}
          </span>
        ) : (
          <span
            className={`d-block fs-6 ${
              messageType === "warning" ? "text-warning" : "text-danger"
            }`}
          >
            {message}
          </span>
        )}
      </p>
    </ProductCard>
  )
}

export default EventPageProductListItemContent
