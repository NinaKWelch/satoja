import { getSellersUpcomingEventsWithProducts } from "../services/events"

export const RECEIVE_SELLER_EVENTS = "RECEIVE_SELLER_EVENTS"

export const receiveSellerEvents = (id) => {
  return async (dispatch) => {
    try {
      const events = await getSellersUpcomingEventsWithProducts(id)
      dispatch({ type: "RECEIVE_SELLER_EVENTS", events: events, sellerID: id })
    } catch (e) {
      console.log(e)
    }
  }
}
