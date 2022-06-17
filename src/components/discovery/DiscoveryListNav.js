import Navbar from "react-bootstrap/Navbar"

const DiscoveryListNav = () => (
  <Navbar fixed="top" style={{ zIndex: 990 }} className="discovery-nav-header pb-0">
    <Navbar.Text as="h2" className="mb-2 mx-sm-auto text-dark">
      Tapahtumakalenteri
    </Navbar.Text>
  </Navbar>
)

export default DiscoveryListNav
