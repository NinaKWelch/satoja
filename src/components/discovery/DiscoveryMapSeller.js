import { Link } from "react-router-dom"
import { ReactComponent as CloseIcon } from "../../media/x-lg.svg"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const DiscoveryMapSeller = ({ seller, handleClose, handleInstantClose }) => (
  <Row className="d-md-none pt-2 px-2 align-items-end border-top bg-light">
    <Col xs={12} className="text-end">
      <Button
        variant="light"
        className="rounded-circle"
        area-label="sulje"
        onClick={handleClose}
      >
        <CloseIcon />
      </Button>
    </Col>
    <Col
      xs={12}
      md={{ span: 5, offset: 1 }}
      className="mb-3 mb-md-0 text-center text-md-start"
    >
      <h3 className="mb-0 lh-1 fs-4 text-capitalize text-truncate">
        {seller.name ? seller.name : seller.firstname + " " + seller.lastname}
      </h3>
      <address className="mb-0 lh-1 fs-5 text-capitalize text-truncate">
        {seller.address}
        <br />
        {seller.zipcode && seller.place && `${seller.zipcode} ${seller.place}`}
      </address>
    </Col>
    <Col xs={{ span: 10, offset: 1 }} md={{ span: 5, offset: 0 }} className="text-center">
      <Button
        as={Link}
        to={`/sellers/${seller.id}`}
        variant="success"
        size="lg"
        className="w-100"
        onClick={handleInstantClose}
      >
        Tuottajan sivulle
      </Button>
    </Col>
  </Row>
)

export default DiscoveryMapSeller
