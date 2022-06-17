import { combineReducers } from "redux"
import { authedUser } from "./authedUser"
import { buyerOrders } from "./buyerOrders"
import { buyerRekoOrders } from "./buyerRekoOrders"

import { events } from "./events"
import { loginModal } from "./loginModal"
import { mapView, mapMarkers, currentMapMarkers } from "./mapReducer"
import { markets } from "./markets"
import { notification } from "./notification"
import { payments } from "./payments"
import { products } from "./products"
import { sellerEvents } from "./sellerEvents"
import { sellerMarkets } from "./sellerMarkets"
import { sellerOrders } from "./sellerOrders"
import { sellerRekoOrders } from "./sellerRekoOrders"

import { sellerProducts } from "./sellerProducts"
import { shoppingCart } from "./shoppingCart"
import { signedUser } from "./signedUser"
import { view } from "./view"

export default combineReducers({
  authedUser,
  buyerOrders,
  buyerRekoOrders,
  events,
  loginModal,
  mapView,
  mapMarkers,
  currentMapMarkers,
  markets,
  notification,
  payments,
  products,
  sellerEvents,
  sellerMarkets,
  sellerOrders,
  sellerProducts,
  shoppingCart,
  signedUser,
  view,
  sellerRekoOrders,
})
