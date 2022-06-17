import { getBuyerRekoOrders } from "../services/orders"

export const RECEIVE_BUYER_REKO_ORDERS = "RECEIVE_BUYER_REKO_ORDERS"

const sortOrdersByEvents = (arr) => {
  let events = []

  arr.forEach((item) => {
    const newEvent = {
      event_id: item.event_id,
      event_start: item.event_start,
      event_endtime: item.event_endtime,
      event_name: item.event_name || item.market.place || "",
      event_description: item.event_description || "",
      market: {
        market_name: item.market.market_name || "",
        place: item.market.place || "",
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

export const receiveBuyerRekoOrders = (id) => {
  return async (dispatch) => {
    try {
      const orders = await getBuyerRekoOrders(id)

      for (const order of orders) {
        for (const product of order.products)
          if (product.type === "pc") {
            product.type = "kpl"
          }
      }

      if (orders && orders.length > 0) {
        const sortedOrders = sortOrdersByEvents(orders)

        dispatch({ type: "RECEIVE_BUYER_REKO_ORDERS", rekoOrders: sortedOrders })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
