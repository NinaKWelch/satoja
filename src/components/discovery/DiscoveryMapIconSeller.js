import L from "leaflet"
import sellerIcon from "../../media/map-markers/location-seller.svg"
import sellerIconActive from "../../media/map-markers/location-seller-active.svg"
import sellerIconShadow from "../../media/map-markers/location-shadow.png"

let DefaultIcon = L.Icon.extend({
  options: {
    shadowUrl: sellerIconShadow,
    iconSize: [25, 50],
    iconAnchor: [12.5, 0],
    shadowAnchor: [11, -2],
    className: "map-marker-icon",
  },
})

export const SellerMarker = new DefaultIcon({ iconUrl: sellerIcon })
export const SellerMarkerActive = new DefaultIcon({ iconUrl: sellerIconActive })
