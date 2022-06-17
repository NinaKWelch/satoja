import {
  RECEIVE_SELLER_REKO_ORDERS,
  DELETE_SELLER_REKO_ORDER,
} from "../actions/sellerRekoOrders"

export const sellerRekoOrders = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_SELLER_REKO_ORDERS:
      return action.rekoOrders
    case DELETE_SELLER_REKO_ORDER:
      let updatedEvents2 = []
      // map through each event to find
      // the order selected to be removed
      for (let event of state) {
        const deletedOrder = event.orders.find((order) => order.order_id === action.id)

        if (deletedOrder) {
          // mark each product as removed
          const markAsDeleted = deletedOrder.user_orders.map((product) => {
            return { ...product, removed: true }
          })
          // update orders
          const updatedOrders2 = event.orders.map((order) =>
            order.order_id !== action.id
              ? order
              : { ...order, user_orders: markAsDeleted }
          )
          // update events
          updatedEvents2 = state.map((item) =>
            item.event_id !== event.event_id ? item : { ...item, orders: updatedOrders2 }
          )
        }
      }

      return updatedEvents2
    default:
      return state
  }
}
