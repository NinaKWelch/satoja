import { getMapData } from "../services/map"
import productService from "../services/products"
import { isEqual } from "lodash"
import { NOTIFY_ERROR } from "./notification"
export const SET_MAP_VIEW = "SET_MAP_VIEW"
export const SET_MAP_MARKERS = "SET_MAP_MARKERS"
export const SET_CURRENT_MAP_MARKERS = "SET_CURRENT_MAP_MARKERS"

// set map center and zoom
export const setMapView = (center, zoom) => {
  const data = { center, zoom }

  return {
    type: SET_MAP_VIEW,
    data,
  }
}

// receive all current markets and sellers
// TODO: the products could be added at the bakend
// TODO: more than one event could be shown for each market (closest event first)
export const setMapMarkers = () => async (dispatch) => {
  const data = await getMapData()

  const setMarkers = async (data) => {
    let activeMarkets = []
    let activeSellers = []

    if (data.Markets && data.Markets.length > 0) {
      for (let market of data.Markets) {
        let activeEvents = []
        for (let event of market.market_events) {
          // get products sold at the event
          await productService.getEventProducts(event.id).then((products) => {
            products && products.length > 0 && activeEvents.push({ ...event, products })
          })
        }

        // only show markets that have events with products
        if (activeEvents.length > 0) {
          activeMarkets.push({ ...market, market_events: activeEvents })
        }
      }
    }

    if (data.Sellers && data.Sellers.length > 0) {
      // only show sellers with address
      activeSellers = data.Sellers.filter((seller) => seller.address)
    }

    // set initial state for markers
    dispatch({
      type: "SET_MAP_MARKERS",
      data: { markets: activeMarkets, sellers: activeSellers },
    })
  }

  if (data) {
    setMarkers(data)
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Karttamerkkien tuonti epäonnistui" })
  }
}

// check that markers are up to date
export const updateMapMarkers = (markers) => async (dispatch) => {
  const data = await getMapData()

  const updateMarkers = async (data) => {
    let updatedMarkets = []
    let updatedSellers = []

    if (data.Markets && data.Markets.length > 0) {
      for (let market of data.Markets) {
        let activeEvents = []
        for (let event of market.market_events) {
          // get products sold at the event
          await productService.getEventProducts(event.id).then((products) => {
            products && products.length > 0 && activeEvents.push({ ...event, products })
          })
        }

        // only show markets that have events with products
        if (activeEvents.length > 0) {
          updatedMarkets.push({ ...market, market_events: activeEvents })
        }
      }
    }

    if (data.Sellers && data.Sellers.length > 0) {
      // only show sellers with address
      updatedSellers = data.Sellers.filter((seller) => seller.address)
    }

    // update local state
    dispatch({
      type: "SET_MAP_MARKERS",
      data: { markets: updatedMarkets, sellers: updatedSellers },
    })
  }

  if (data) {
    const setMarketIds = markers.markets.map((market) => {
      return [market.id, market.market_events[0].id]
    })
    const dataMarketIds = data.Markets.map((market) => {
      return [market.id, market.market_events[0].id]
    })
    const setSellerIds = markers.sellers.map((seller) => {
      return seller.id
    })
    const dataSellerIds = data.Sellers.filter((seller) => seller.address).map(
      (seller) => {
        return seller.id
      }
    )

    // check if markets or sellers have changed
    // and update if necessary
    if (!isEqual(setMarketIds, dataMarketIds) || !isEqual(setSellerIds, dataSellerIds)) {
      dispatch(updateMarkers(data))
    }
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Karttamerkkien päivittäminen epäonnistui" })
  }
}

// set current markers based on map view
export const setCurrentMapMarkers = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_CURRENT_MAP_MARKERS", data })
  }
}
