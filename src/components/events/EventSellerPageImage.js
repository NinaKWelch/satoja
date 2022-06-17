import Image from "react-bootstrap/Image"
import defaultImg from "../../media/img-defaults/profile-blank_or75kg.png"

const EventSellerPageImage = ({ seller }) => (
  <Image
    src={
      seller.image_url
        ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_1200/${seller.image_url}`
        : defaultImg
    }
    onError={(e) => (e.target.src !== defaultImg ? (e.target.src = defaultImg) : "")}
    alt="tuottajan kuva"
    className="producer-page-image rounded mb-md-4"
    fluid
  />
)

export default EventSellerPageImage
