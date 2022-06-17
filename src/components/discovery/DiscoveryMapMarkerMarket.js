import { useDispatch } from "react-redux"
import { useMap, Marker } from "react-leaflet"
import { setMapView } from "../../actions/map"
import { MarketMarker, MarketMarkerActive } from "./DiscoveryMapIconMarket"

const DiscoveryMapMarkerMarket = ({ market, activeMarket, handleShow, handleClose }) => {
  const dispatch = useDispatch()
  // access the map context
  const map = useMap()
  // map co-ordinates
  // if they have not been set (error), do not show the marker
  const latlng =
    market.location.lat !== "undefined" && market.location.lon !== "undefined"
      ? [Number(market.location.lat), Number(market.location.lon)]
      : []

  const showMarketInfo = (latlng) => {
    // close active seller
    handleClose()
    // show active market info
    handleShow(market)
    // update map center and zoom
    dispatch(setMapView(latlng, 16))
    // center map at marker location and zoom closer
    map.setView({ lat: latlng[0], lng: latlng[1] }, 16)
  }

  // error fallback
  if (latlng.length !== 2) {
    return null
  }

  return (
    <Marker
      position={latlng.length === 2 && latlng}
      icon={activeMarket === market ? MarketMarkerActive : MarketMarker}
      eventHandlers={{
        click: () => latlng.length === 2 && showMarketInfo(latlng),
      }}
    />
  )
}

export default DiscoveryMapMarkerMarket
