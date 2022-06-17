import { Link } from "react-router-dom"
import { ReactComponent as CloseIcon } from "../../media/x-lg.svg"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import EventInfo from "../events/EventInfo"

const DiscoveryMapEvent = ({ market, handleClose, handleInstantClose }) => (
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
      <EventInfo market={market} event={market.market_events[0]} omitMarketName={true} />
    </Col>
    <Col xs={{ span: 10, offset: 1 }} md={{ span: 5, offset: 0 }} className="text-center">
      <Button
        as={Link}
        to={`/events/${market.market_events[0].id}`}
        variant="primary"
        size="lg"
        className="w-100"
        onClick={handleInstantClose}
      >
        Siirry tilaisuuteen
      </Button>
    </Col>
  </Row>
)

export default DiscoveryMapEvent
