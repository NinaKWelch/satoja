import { handleMissingImage } from "../../helpers/imageErrorHelper"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import OrganicLabel from "../OrganicLabel"

const ProductCard = ({ product, children }) => (
  <Row className="g-0 border border-secondary rounded bg-white">
    <Col xs={5}>
      <Image
        src={
          product.image_url
            ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_600,ar_1:1,c_fill,g_auto/${product.image_url}`
            : handleMissingImage(product.category)
        }
        onError={(e) =>
          e.target.src !== handleMissingImage(product.category)
            ? (e.target.src = handleMissingImage(product.category))
            : ""
        }
        alt="tuotekuva"
        className="rounded-start"
        fluid
      />
      {product.organic && <OrganicLabel onProductPage={false} />}
    </Col>
    <Col xs={7} className="py-1 px-2">
      {children}
    </Col>
  </Row>
)

export default ProductCard
