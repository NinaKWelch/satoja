import { handleMissingImage } from "../../helpers/imageErrorHelper"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"

const OrderSellerProductImage = ({ image, category }) => {
  return (
    <Col xs={3}>
      <Image
        src={
          image
            ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_600,ar_1:1,c_fill,g_auto/${image}`
            : handleMissingImage(category)
        }
        onError={(e) =>
          e.target.src !== handleMissingImage(category)
            ? (e.target.src = handleMissingImage(category))
            : ""
        }
        alt="tuotekuva"
        fluid
      />
    </Col>
  )
}

export default OrderSellerProductImage
