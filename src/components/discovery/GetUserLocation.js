import { useMapEvents } from "react-leaflet"

const GetUserLocation = () => {
  const map = useMapEvents({
    click: () => {
      map.locate()
    },
    locationfound: (location) => {
      //console.log("location found: ", location)
    },
    locationerror: () => {
      // TODO: show popup
      map.stopLocate()
    },
  })

  return null
}

export default GetUserLocation
