import Col from "react-bootstrap/esm/Col"
import Image from "react-bootstrap/esm/Image"

const BuyerInfo = (props) => (
  <Col
    xs={{ span: 8, offset: 2 }}
    md={{ span: 6, offset: 3 }}
    lg={{ span: 4, offset: 4 }}
    className="my-4 text-center"
  >
    <h3>
      {props.user.users_firstname} {props.user.users_lastname}
    </h3>
    <div className="mb-4">
      <Image
        src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${props.user.users_image_url}`}
        rounded
        fluid
        alt={`Kuvassa ${props.user.users_firstname}`}
      />
    </div>
    <p className="mb-1">{props.user.users_email}</p>
    <p>{props.user.users_phonenumber}</p>
  </Col>
)

export default BuyerInfo
