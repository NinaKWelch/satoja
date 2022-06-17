import { useDispatch } from "react-redux"
import { useMap, Marker } from "react-leaflet"
import { setMapView } from "../../actions/map"
import { SellerMarker, SellerMarkerActive } from "./DiscoveryMapIconSeller"

const DiscoveryMapMarkerSeller = ({ seller, activeSeller, handleShow, handleClose }) => {
  const dispatch = useDispatch()
  // access the map context
  const map = useMap()
  // map co-ordinates
  // if they have not been set (error), do not show the marker
  const latlng =
    seller.location.lat !== "undefined" && seller.location.lon !== "undefined"
      ? [Number(seller.location.lat), Number(seller.location.lon)]
      : []

  const showSellerInfo = (latlng) => {
    // close active market
    handleClose()
    // show active seller info
    handleShow(seller)
    // update map center and zoom
    dispatch(setMapView(latlng, 16))
    // center map at seller location and zoom closer
    map.setView({ lat: latlng[0], lng: latlng[1] }, 16)
  }

  // error fallback
  if (latlng.length !== 2) {
    return null
  }

  return (
    <Marker
      position={latlng}
      icon={activeSeller === seller ? SellerMarkerActive : SellerMarker}
      eventHandlers={{
        click: () => latlng.length === 2 && showSellerInfo(latlng),
      }}
    />
  )
}

export default DiscoveryMapMarkerSeller
