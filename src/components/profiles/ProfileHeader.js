import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import defaultImg from "../../media/img-defaults/profile-blank_or75kg.png"

const ProfileHeader = ({ imageUrl, handleShow }) => (
  <Col
    xs={{ span: 8, offset: 2 }}
    sm={{ span: 4, offset: 4 }}
    md={{ span: 3, offset: 1 }}
    className="mb-4 text-center"
  >
    <div className="mb-4">
      {/* fallbacks added for missing or broken image link */}
      <Image
        src={
          imageUrl
            ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_600,ar_1:1,c_fill,g_auto/${imageUrl}`
            : defaultImg
        }
        onError={(e) => (e.target.src !== defaultImg ? (e.target.src = defaultImg) : "")}
        alt="profiilikuva"
        roundedCircle
        fluid
      />
    </div>
    <Button
      variant="secondary"
      size="lg"
      type="button"
      className="w-100"
      onClick={handleShow}
    >
      Vaihda kuva
    </Button>
  </Col>
)

export default ProfileHeader
