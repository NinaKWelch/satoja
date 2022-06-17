import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet"
import AdminCreatePickUpMarker from "./AdminCreatePickUpMarker"
import React, { useEffect, useState } from "react"
import styles from "./AdminMapMarker.module.css"
const axios = require("axios")

function ChangeView({ center, zoom }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

const AdminCreatePickUpMap = ({ location, setLocation, zipcode }) => {
  const [coords, setCoords] = useState([62.892982923, 27.688934744])
  const [newCenter, setNewCenter] = useState(false)

  useEffect(() => {
    const getCoords = async (z) => {
      if (z.length > 0) {
        let response = await axios.get(`/api/areas/geoap/${z}`)
        setCoords([response.data[0], response.data[1]])
        setNewCenter(true)
      }
      //Allows zooming etc after 1s so it wont keep centering it to the postcode
      const timeout = setTimeout(() => {
        setNewCenter(false)
      }, 1000)
    }
    getCoords(zipcode)
  }, [zipcode])

  return (
    <div xs={6} className={styles.mapContainer}>
      <div className={styles.mapMarkerCentered}></div>
      <MapContainer
        className={styles.map}
        center={coords}
        zoom={7}
        zoomControl={false}
        maxZoom={18}
      >
        {newCenter ? <ChangeView center={coords} /> : null}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AdminCreatePickUpMarker
          className={styles.mapMarkerCentered}
          location={location}
          setLocation={setLocation}
        />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
}
export default AdminCreatePickUpMap
