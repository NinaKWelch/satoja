import { MapContainer, TileLayer, ZoomControl } from "react-leaflet"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import DiscoveryMapMarkerSeller from "./DiscoveryMapMarkerSeller"
import DiscoveryMapMarkerMarket from "./DiscoveryMapMarkerMarket"
import GetVisibleMarkers from "./GetVisibleMarkers"
import GetUserLocation from "./GetUserLocation"
import GetClickLocation from "./GetClickLocation"

const DiscoveryMap = ({
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
}) => (
  <Row
    className={
      showMarket === true || showSeller === true
        ? "g-0 discovery-map-view-active"
        : "g-0 discovery-map-view"
    }
  >
    <Col
      xs={12}
      className={
        showMarket === true || showSeller === true
          ? "discovery-map-active"
          : "discovery-map"
      }
    >
      <MapContainer center={center} zoom={zoom} zoomControl={false} maxZoom={18}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {markets &&
          markets.length > 0 &&
          markets.map((market, index) => (
            <DiscoveryMapMarkerMarket
              key={index}
              market={market}
              activeMarket={activeMarket}
              handleShow={handleShowMarket}
              handleClose={handleCloseSeller}
            />
          ))}
        {sellers &&
          sellers.length > 0 &&
          sellers.map((seller, index) => (
            <DiscoveryMapMarkerSeller
              key={index}
              seller={seller}
              activeSeller={activeSeller}
              handleShow={handleShowSeller}
              handleClose={handleCloseMarket}
            />
          ))}
        <GetVisibleMarkers
          center={center}
          zoom={zoom}
          markets={markets}
          sellers={sellers}
        />
        <GetClickLocation
          zoom={zoom}
          activeSeller={activeSeller}
          activeMarket={activeMarket}
          handleCloseSeller={handleCloseSeller}
          handleCloseMarket={handleCloseMarket}
        />
        <GetUserLocation />
      </MapContainer>
    </Col>
  </Row>
)

export default DiscoveryMap
