import { getSellerRekoOrders, deleteOrder } from "../services/orders"
import { NOTIFY_ERROR } from "./notification"
export const RECEIVE_SELLER_REKO_ORDERS = "RECEIVE_SELLER_REKO_ORDERS"
export const DELETE_SELLER_REKO_ORDER = "DELETE_SELLER_REKO_ORDER"

// sort orders by event
const sortOrdersByEvents = (arr) => {
  let events = []

  arr.forEach((item) => {
    const newEvent = {
      event_id: item.event_id,
      event_start: item.event_start,
      event_endtime: item.event_endtime,
      event_name: item.event_name || item.reko_name || "",
      description: item.description || "",
      market: {
        market_name: item.market_name || item.place || "",
        place: item.place || "",
        address: item.event_address,
        market_description: item.market_description || "",
      },
      orders: item.events_orders,
      outdated: item.outdated,
    }

    events.push(newEvent)
  })

  return events
}

export const receiveSellerRekoOrders = (id) => {
  return async (dispatch) => {
    try {
      const rekoOrders = await getSellerRekoOrders(id)

      if (rekoOrders && rekoOrders.length > 0) {
        const sortedOrders = sortOrdersByEvents(rekoOrders)
        dispatch({ type: "RECEIVE_SELLER_REKO_ORDERS", rekoOrders: sortedOrders })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const deleteSellerRekoOrder = (seller_id, order_id) => {
  return async (dispatch) => {
    try {
      // currently there is no response for deleting the order
      deleteOrder(seller_id, order_id)

      dispatch({ type: "DELETE_SELLER_REKO_ORDER", id: order_id })
    } catch (err) {
      dispatch({ type: NOTIFY_ERROR, message: "Tilauksen poisto epäonnistui." })
    }
  }
}
