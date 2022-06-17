import L from "leaflet"
import marketIcon from "../../media/map-markers/location-market.svg"
import marketIconActive from "../../media/map-markers/location-market-active.svg"
import marketIconShadow from "../../media/map-markers/location-shadow.png"

let DefaultIcon = L.Icon.extend({
  options: {
    shadowUrl: marketIconShadow,
    iconSize: [25, 50],
    iconAnchor: [12.5, 0],
    shadowAnchor: [11, -2],
    className: "map-marker-icon",
  },
})

export const MarketMarker = new DefaultIcon({ iconUrl: marketIcon })
export const MarketMarkerActive = new DefaultIcon({ iconUrl: marketIconActive })
