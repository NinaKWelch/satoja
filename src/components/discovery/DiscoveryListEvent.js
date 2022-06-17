import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import EventInfo from "../events/EventInfo"
import { ReactComponent as MarketIcon } from "../../media/map-markers/store-solid.svg"

const DiscoveryListEvent = ({ event, market, activeMarket }) => (
  <Col
    as={Link}
    to={`/events/${event.id}`}
    xs={12}
    className="text-decoration-none text-dark"
  >
    <Card
      className={
        activeMarket && activeMarket.id === event.market.id
          ? "bg-light border border-2 border-primary"
          : "bg-light"
      }
    >
      <Card.Body>
        <Row className="g-0">
          <Col xs={8}>
            {market && (
              <EventInfo
                market={market}
                event={event}
                omitMarketName={true}
                omitDate={true}
              />
            )}
          </Col>
          <Col xs={4} className="text-end">
            <Row className="h-100">
              <Col xs={12}>
                <MarketIcon width="24" style={{ fill: "rgb(0,93,184)" }} />
              </Col>
              <Col xs={12} className="mt-auto lh-1">
                {event.products.length === 1
                  ? `${event.products.length} tuote`
                  : `${event.products.length} tuotetta`}{" "}
                myynnissä
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
)

export default DiscoveryListEvent
