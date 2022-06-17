import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import DiscoveryList from "./DiscoveryList"
import DiscoveryMap from "./DiscoveryMap"

const DiscoveryContentWeb = ({
  center,
  zoom,
  markets,
  sellers,
  activeMarket,
  activeSeller,
  showMarket,
  showSeller,
  handleShowMarket,
  handleShowSeller,
  handleCloseMarket,
  handleCloseSeller,
}) => {
  return (
    <Row className="g-0">
      <Col md={5} lg={4} className="vh-100 bg-basic overflow-scroll">
        <div className="my-3 text-center">
          <h2>Tapahtumakalenteri</h2>
        </div>
        <DiscoveryList
          markets={markets}
          sellers={sellers}
          activeMarket={activeMarket}
          activeSeller={activeSeller}
        />
      </Col>
      <Col md={7} lg={8}>
        <DiscoveryMap
          center={center}
          zoom={zoom}
          markets={markets}
          sellers={sellers}
          activeMarket={activeMarket}
          activeSeller={activeSeller}
          showMarket={showMarket}
          showSeller={showSeller}
          handleShowMarket={handleShowMarket}
          handleShowSeller={handleShowSeller}
          handleCloseMarket={handleCloseMarket}
          handleCloseSeller={handleCloseSeller}
        />
      </Col>
    </Row>
  )
}

export default DiscoveryContentWeb
