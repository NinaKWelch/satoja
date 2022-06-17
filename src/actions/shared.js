import { getInitialData } from "../services"
// import { setAuthedUser } from "./authedUser"
import receiveProducts from "./products"
// import { receiveEvents } from "./events"

// const AUTHED_ID = null

export const handleInitialData = () => (dispatch) => {
  return getInitialData().then(({ products /*, events*/ }) => {
    // dispatch(setAuthedUser(AUTHED_ID))
    dispatch(receiveProducts(products))
    // dispatch(receiveEvents(events))
  })
}
