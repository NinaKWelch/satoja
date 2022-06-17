import { useDispatch, useSelector } from "react-redux"
import { useMap, useMapEvents } from "react-leaflet"
import { setMapView } from "../../actions/map"
import { setCurrentMapMarkers } from "../../actions/map"

const GetVisibleMarkers = ({ center, zoom, markets, sellers }) => {
  const dispatch = useDispatch()
  // access the map context
  const map = useMap()
  // get all markers
  const mapMarkers = useSelector(({ mapMarkers }) => mapMarkers)

  // Get visible markers on the map
  const getMarkers = () => {
    // get map bounds
    const bounds = map.getBounds()
    const currentZoom = map.getZoom()
    const currentCenter = map.getCenter()

    // check which markets are visible on the map
    const visibleMarkets = mapMarkers.markets.filter((market) =>
      bounds.contains([Number(market.location.lat), Number(market.location.lon)])
    )

    // check which sellers are visible on the map
    const visibleSellers = mapMarkers.sellers.filter((seller) =>
      bounds.contains([Number(seller.location.lat), Number(seller.location.lon)])
    )

    // update markers when map has been zoomed or moved
    if (visibleMarkets !== markets || visibleSellers !== sellers) {
      dispatch(setCurrentMapMarkers({ markets: visibleMarkets, sellers: visibleSellers }))
    }

    // update map center and zoom
    if (currentCenter !== center || currentZoom !== zoom) {
      dispatch(setMapView(currentCenter, currentZoom))
    }
  }

  // access map events from Leaflet API
  useMapEvents({
    zoomend: () => getMarkers(),
    moveend: () => getMarkers(),
  })

  return null
}

export default GetVisibleMarkers
