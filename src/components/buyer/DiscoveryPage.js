import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setMapMarkers, updateMapMarkers } from "../../actions/map"
import { setMapView } from "../../actions/map"
import Container from "react-bootstrap/Container"
import SEO from "../home/SEO"
import TemplatePageLoading from "../TemplatePageLoading"
import DiscoveryContent from "../discovery/DiscoveryContent"
import DiscoveryNav from "../discovery/DiscoveryNav"

const DiscoveryPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const mapMarkers = useSelector(({ mapMarkers }) => mapMarkers)
  const mapView = useSelector(({ mapView }) => mapView)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // store all active markets and sellers in local state
    // and check that stored markers are up to date
    // when user returns to the map page
    !mapMarkers ? dispatch(setMapMarkers()) : dispatch(updateMapMarkers(mapMarkers))
  }, [dispatch, mapMarkers])

  useEffect(() => {
    // set the initial center and zoom for the map
    !mapView && dispatch(setMapView([65, 26], 5))
  }, [dispatch, mapView])

  useEffect(() => {
    // handle page loading
    !mapMarkers || !mapView ? setLoading(true) : setLoading(false)
  }, [mapMarkers, mapView])

  return (
    <Container className="template-page-container px-0 bg-light" fluid>
      <SEO
        title="Tapahtumakalenteri"
        description="Löydä osto- ja myyntitapahtumia alueellasi."
        keywords="Kalenteri, Kartta, Tapahtumat, Noutotapahtumat"
        // image={}
      />
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <>
          <DiscoveryNav pathname={location.pathname} />
          <DiscoveryContent
            pathname={location.pathname}
            center={mapView && mapView.center}
            zoom={mapView && mapView.zoom}
            markets={mapMarkers && mapMarkers.markets}
            sellers={mapMarkers && mapMarkers.sellers}
          />
        </>
      )}
    </Container>
  )
}

export default DiscoveryPage
