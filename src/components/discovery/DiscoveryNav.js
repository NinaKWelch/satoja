import { Link } from "react-router-dom"
import { ReactComponent as MapIcon } from "../../media/map-fill.svg"
import { ReactComponent as ListIcon } from "../../media/calendar-event-fill.svg"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"

const DiscoveryNav = ({ pathname }) => (
  <Nav className="d-md-none position-fixed top-0 end-0" style={{ zIndex: 1000 }}>
    {pathname === "/events" && (
      <Nav.Link as={Link} to="/map">
        <Button
          variant="dark"
          size="lg"
          aria-label="Avaa Karttanäkymä"
          className="rounded-circle"
        >
          <MapIcon />
        </Button>
      </Nav.Link>
    )}
    {pathname === "/map" && (
      <Nav.Link as={Link} to="/events">
        <Button
          variant="dark"
          size="lg"
          area-label="Avaa tapahtumakalenteri"
          className="rounded-circle"
        >
          <ListIcon />
        </Button>
      </Nav.Link>
    )}
  </Nav>
)

export default DiscoveryNav
