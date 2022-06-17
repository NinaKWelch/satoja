import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentMapMarkers } from "../../actions/map"
import DiscoveryMap from "./DiscoveryMap"
import DiscoveryMapEvent from "./DiscoveryMapEvent"
import DiscoveryMapSeller from "./DiscoveryMapSeller"
import DiscoveryContentWeb from "./DiscoveryContentWeb"
import DiscoveryListNav from "./DiscoveryListNav"
import DiscoveryList from "./DiscoveryList"

const DiscoveryContent = ({ pathname, center, zoom, markets, sellers }) => {
  const dispatch = useDispatch()
  const currentMapMarkers = useSelector(({ currentMapMarkers }) => currentMapMarkers)
  const [activeMarket, setActiveMarket] = useState(null)
  const [activeSeller, setActiveSeller] = useState(null)
  const [showMarket, setShowMarket] = useState(false)
  const [showSeller, setShowSeller] = useState(false)

  useEffect(() => {
    // set all markets and sellers initially as current
    markets &&
      sellers &&
      !currentMapMarkers &&
      dispatch(setCurrentMapMarkers({ markets, sellers }))
  }, [currentMapMarkers, dispatch, markets, sellers])

  // show active market info
  const showActiveMarket = (market) => {
    setActiveMarket(market)
    showMarket === false && setShowMarket(true)
  }

  // hide active market info
  const hideActiveMarket = () => {
    showMarket === true && setShowMarket(false)
    setTimeout(() => {
      setActiveMarket(null)
    }, 1000)
  }

  // cases where user navigates to the event page
  // on mobile screens on button press
  const instantlyHideActiveMarket = () => {
    setActiveMarket(null)
    showMarket === true && setShowMarket(false)
  }

  // show active seller info
  const showActiveSeller = (seller) => {
    setActiveSeller(seller)
    showSeller === false && setShowSeller(true)
  }

  // hide active seller info
  const hideActiveSeller = () => {
    showSeller === true && setShowSeller(false)
    setTimeout(() => {
      setActiveSeller(null)
    }, 1000)
  }

  // cases where user navigates to the seller
  // on mobile screens on button press
  const instantlyHideActiveSeller = () => {
    setActiveSeller(null)
    showSeller === true && setShowSeller(false)
  }

  return (
    <>
      {pathname === "/map" && markets && (
        <>
          {/* mobile view */}
          <div className="d-md-none">
            <DiscoveryMap
              center={center}
              zoom={zoom}
              markets={currentMapMarkers && currentMapMarkers.markets}
              sellers={currentMapMarkers && currentMapMarkers.sellers}
              activeMarket={activeMarket}
              activeSeller={activeSeller}
              showMarket={showMarket}
              showSeller={showSeller}
              handleShowMarket={showActiveMarket}
              handleShowSeller={showActiveSeller}
              handleCloseMarket={() => hideActiveMarket()}
              handleCloseSeller={() => hideActiveSeller()}
            />
            {activeMarket && (
              <DiscoveryMapEvent
                market={activeMarket}
                handleClose={() => hideActiveMarket()}
                handleInstantClose={() => instantlyHideActiveMarket()}
              />
            )}
            {activeSeller && (
              <DiscoveryMapSeller
                seller={activeSeller}
                handleClose={() => hideActiveSeller()}
                handleInstantClose={() => instantlyHideActiveSeller()}
              />
            )}
          </div>
          {/* web view */}
          <div className="d-none d-md-block">
            <DiscoveryContentWeb
              center={center}
              zoom={zoom}
              markets={currentMapMarkers && currentMapMarkers.markets}
              sellers={currentMapMarkers && currentMapMarkers.sellers}
              activeMarket={activeMarket}
              activeSeller={activeSeller}
              showMarket={showMarket}
              showSeller={showSeller}
              handleShowMarket={showActiveMarket}
              handleShowSeller={showActiveSeller}
              handleCloseMarket={() => hideActiveMarket()}
              handleCloseSeller={() => hideActiveSeller()}
            />
          </div>
        </>
      )}
      {pathname === "/events" && markets && (
        <>
          {/* mobile view */}
          <div className="d-md-none discovery-list bg-basic">
            <DiscoveryListNav />
            <DiscoveryList
              markets={currentMapMarkers && currentMapMarkers.markets}
              sellers={currentMapMarkers && currentMapMarkers.sellers}
              activeMarket={activeMarket}
              activeSeller={activeSeller}
            />
          </div>
          {/* web view (events and map pages look the same) */}
          <div className="d-none d-md-block">
            <DiscoveryContentWeb
              center={center}
              zoom={zoom}
              markets={currentMapMarkers && currentMapMarkers.markets}
              sellers={currentMapMarkers && currentMapMarkers.sellers}
              activeMarket={activeMarket}
              activeSeller={activeSeller}
              showMarket={showMarket}
              showSeller={showSeller}
              handleShowMarket={showActiveMarket}
              handleShowSeller={showActiveSeller}
              handleCloseMarket={() => hideActiveMarket()}
              handleCloseSeller={() => hideActiveSeller()}
            />
          </div>
        </>
      )}
    </>
  )
}

export default DiscoveryContent
