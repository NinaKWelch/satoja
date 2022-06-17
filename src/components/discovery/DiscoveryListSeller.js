import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { ReactComponent as SellerIcon } from "../../media/map-markers/user-solid.svg"

const DiscoveryListSeller = ({ seller, activeSeller }) => (
  <Col
    as={Link}
    to={`/sellers/${seller.id}`}
    xs={12}
    className="text-decoration-none text-dark"
  >
    <Card
      className={
        activeSeller && activeSeller.id === seller.id
          ? "bg-light border border-2 border-success"
          : "bg-light"
      }
    >
      <Card.Body>
        <Row className="g-0">
          <Col xs={8}>
            <h3 className="mb-0 lh-1 fs-4 text-capitalize text-truncate">
              {seller.name ? seller.name : seller.firstname + " " + seller.lastname}
            </h3>
            <address className="mb-0 lh-1 fs-5 text-capitalize text-truncate">
              {seller.address}
              <br />
              {seller.zipcode && seller.place && `${seller.zipcode} ${seller.place}`}
            </address>
          </Col>
          <Col xs={4} className="text-end">
            <SellerIcon width="24" style={{ fill: "rgb(25,135,84)" }} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
)

export default DiscoveryListSeller
