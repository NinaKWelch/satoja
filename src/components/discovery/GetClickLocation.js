import { useDispatch } from "react-redux"
import { useMapEvent } from "react-leaflet"
import { setMapView } from "../../actions/map"

const GetClickLocation = ({
  zoom,
  activeMarket,
  activeSeller,
  handleCloseMarket,
  handleCloseSeller,
}) => {
  const dispatch = useDispatch()

  const map = useMapEvent("click", (e) => {
    const newCenter = [e.latlng.lat, e.latlng.lng]
    // if map is clicked when market is active
    // zoom out and center the map on the market location
    if (activeMarket) {
      let latlng = [Number(activeMarket.location.lat), Number(activeMarket.location.lon)]

      if (zoom === 16) {
        // update map center and zoom
        dispatch(setMapView(latlng, 10))
        // center map at active market location
        map.setView(latlng, 10)
        // close active market
      }

      // close active market
      handleCloseMarket()
    }

    if (activeSeller) {
      let latlng = [Number(activeSeller.location.lat), Number(activeSeller.location.lon)]

      if (zoom === 16) {
        // update map center and zoom
        dispatch(setMapView(latlng, 10))
        // center map at active market location
        map.setView(latlng, 10)
        // close active market
      }

      // close active market
      handleCloseSeller()
    }

    // if no market or seller is active
    // center the map on clicked location
    // and zoom closer
    if (!activeMarket && !activeSeller) {
      // increase zoom level by 1
      const zoomCloser = zoom + 1

      // 18 is the maximum zoom level
      if (zoom < 18) {
        // update map center and zoom
        dispatch(setMapView(newCenter, zoomCloser))
        // center map at clicked location
        // and zoom closer
        map.flyTo(newCenter, zoomCloser)
      } else {
        // update map center
        dispatch(setMapView(newCenter, zoom))
        // center map at clicked location
        map.flyTo(newCenter, zoom)
      }
    }
  })

  return null
}

export default GetClickLocation
