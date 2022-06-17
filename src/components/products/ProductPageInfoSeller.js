import defaultImg from "../../media/img-defaults/profile-blank_or75kg.png"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import EventSellerPageInfo from "../events/EventSellerPageInfo"
import EventSellerPageDescription from "../events/EventSellerPageDescription"

const ProductPageSellerInfo = ({ seller }) => (
  <div className="m-3">
    {seller && (
      <Row className="align-items-center">
        <Col xs={8} className="pr-3">
          <EventSellerPageInfo seller={seller} />
        </Col>
        <Col xs={4}>
          <Image
            src={
              seller.image_url
                ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_600,ar_1:1,c_fill,g_auto/${seller.image_url}`
                : defaultImg
            }
            onError={(e) =>
              e.target.src !== defaultImg ? (e.target.src = defaultImg) : ""
            }
            alt="tuottajan profiilikuva"
            className="py-2 rounded-circle"
            fluid
          />
        </Col>
        {seller.description && (
          <Col xs={12}>
            <EventSellerPageDescription description={seller.description} />
          </Col>
        )}
      </Row>
    )}
  </div>
)

export default ProductPageSellerInfo
