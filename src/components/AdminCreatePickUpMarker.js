import { useMapEvents, useMapEvent, Marker } from "react-leaflet"

const AdminCreatePickUpMarker = ({ location, setLocation }) => {
  const map = useMapEvent("click", () => {
    console.log("mapCenter1, ", map.getCenter())
    setLocation(map.getCenter())
  })
  const map2 = useMapEvents({
    dragend: (e) => {
      console.log("mapCenter2", e.target.getCenter())
      setLocation(e.target.getCenter())
      //console.log("setlocation 2in marker ", setLocation)
    },
  })
  const map3 = useMapEvent("zoomend", () => {
    console.log("mapCenter3", map3.getCenter())
    setLocation(map3.getCenter())
    //console.log("setlocation 2in marker ", setLocation)
  })
  return null
}
export default AdminCreatePickUpMarker
