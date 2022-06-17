import { RECEIVE_SELLER_ORDERS, DELETE_SELLER_ORDER } from "../actions/sellerOrders"

export const sellerOrders = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_SELLER_ORDERS:
      return action.orders
    case DELETE_SELLER_ORDER:
      let updatedEvents = []
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
          const updatedOrders = event.orders.map((order) =>
            order.order_id !== action.id
              ? order
              : { ...order, user_orders: markAsDeleted }
          )
          // update events
          updatedEvents = state.map((item) =>
            item.event_id !== event.event_id ? item : { ...item, orders: updatedOrders }
          )
        }
      }

      return updatedEvents
    default:
      return state
  }
}
