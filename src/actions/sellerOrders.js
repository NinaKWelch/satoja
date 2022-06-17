import { getSellerOrders, deleteOrder } from "../services/orders"
import { NOTIFY_ERROR } from "./notification"
export const RECEIVE_SELLER_ORDERS = "RECEIVE_SELLER_ORDERS"
export const DELETE_SELLER_ORDER = "DELETE_SELLER_ORDER"

// sort orders by event
const sortOrdersByEvents = (arr) => {
  let events = []

  arr.forEach((item) => {
    const newEvent = {
      event_id: item.event_id,
      event_start: item.event_start,
      event_endtime: item.event_endtime,
      event_name: item.event_name || item.city || "",
      description: item.description || "",
      market: {
        market_name: item.market_name || item.place || "",
        place: item.place || "",
        region: item.region || "",
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

export const receiveSellerOrders = (id) => {
  return async (dispatch) => {
    try {
      const orders = await getSellerOrders(id)

      if (orders && orders.length > 0) {
        const sortedOrders = sortOrdersByEvents(orders)

        dispatch({ type: "RECEIVE_SELLER_ORDERS", orders: sortedOrders })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const deleteSellerOrder = (seller_id, order_id) => {
  return async (dispatch) => {
    try {
      // currently there is no response for deleting the order
      deleteOrder(seller_id, order_id)

      dispatch({ type: "DELETE_SELLER_ORDER", id: order_id })
    } catch (err) {
      dispatch({ type: NOTIFY_ERROR, message: "Tilauksen poisto epäonnistui." })
    }
  }
}
