import { getBuyerOrders } from "../services/orders"

export const RECEIVE_BUYER_ORDERS = "RECEIVE_BUYER_ORDERS"

const sortOrdersByEvents = (arr) => {
  let events = []
  arr.forEach((item) => {
    const newEvent = {
      event_id: item.event_id,
      event_start: item.event_start,
      event_endtime: item.event_endtime,
      event_name: item.event_name || "",
      event_description: item.event_description || "",
      market: {
        market_name: item.market.market_name || "",
        place: item.market.place || "",
        region: item.market.region || "",
        address: item.market.address,
        market_description: item.market.market_description || "",
      },
      order_id: item.order_id,
      order_date: item.order_date,
      outdated: item.outdated,
      price: item.price,
      products: item.products,
    }
    events.push(newEvent)
  })

  return events
}

export const receiveBuyerOrders = (id) => {
  return async (dispatch) => {
    try {
      const orders = await getBuyerOrders(id)

      for (const order of orders) {
        for (const product of order.products)
          if (product.type === "pc") {
            product.type = "kpl"
          }
      }

      if (orders && orders.length > 0) {
        const sortedOrders = sortOrdersByEvents(orders)

        dispatch({ type: "RECEIVE_BUYER_ORDERS", orders: sortedOrders })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
