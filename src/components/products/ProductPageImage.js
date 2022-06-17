import { handleMissingImage } from "../../helpers/imageErrorHelper"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import OrganicLabel from "../OrganicLabel"

const ProductPageImage = ({ product }) => {
  return (
    <Col
      xs={{ span: 10, offset: 1 }}
      sm={{ span: 8, offset: 2 }}
      md={{ span: 6, offset: 0 }}
      className="mb-3 pt-4 text-center position-relative"
    >
      <Image
        src={
          product.image_url
            ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${product.image_url}`
            : handleMissingImage(product.category)
        }
        onError={(e) =>
          e.target.src !== handleMissingImage(product.category)
            ? (e.target.src = handleMissingImage(product.category))
            : ""
        }
        alt="tuotekuva"
        className="product-page-image border border-white rounded"
        fluid
      />
      {product.organic && <OrganicLabel onProductPage={true} />}
    </Col>
  )
}

export default ProductPageImage
