import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  REMOVE_PRODUCTS_FROM_CART,
  SUBMIT_ORDERS,
  EMPTY_CART,
} from "../actions/shoppingCart"

/*
Example cart state:
[
  {
    event_id: 1,
    event: eventObject,
    batches: [
      {
        size_id: 1,
        order_quantity: 2,
        product: productObject,
        unit: 0.5,
      },
      {
        size_id: 2,
        order_quantity: 1,
        product: productObject,
        unit: 1,
      },
    ],
  },
  {
    event_id: 2,
    event: eventObject,
    batches: [
      {
        size_id: 36,
        order_quantity: 3,
        product: productObject,
        unit: 1.25,
      },
      {
        size_id: 34,
        order_quantity: 1,
        product: productObject,
        unit: 1,
      },
    ],
  },
]
*/

export const shoppingCart = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      // Check if an order object for this event_id exists
      // if not, add new order object to state
      if (!state.find((order) => order.event_id === action.event.id)) {
        return state.concat({
          event_id: action.event.id,
          event: action.event,
          batches: [
            {
              size_id: action.size.id,
              order_quantity: 1,
              quantity: action.size.quantity,
              product: action.product,
              unit: action.size.unit,
            },
          ],
        })
      }

      const newOrdersState = state.map((order) => {
        if (order.event_id === action.event.id) {
          // Check if a batch object for this size_id exists
          // if not, add new batch object to order.batches
          if (!order.batches.find((batch) => batch.size_id === action.size.id)) {
            return {
              ...order,
              batches: order.batches.concat({
                size_id: action.size.id,
                order_quantity: 1,
                quantity: action.size.quantity,
                product: action.product,
                unit: action.size.unit,
              }),
            }
          } else {
            const newBatchesState = order.batches.map((batch) => {
              if (batch.size_id === action.size.id) {
                return { ...batch, order_quantity: batch.order_quantity + 1 }
              }
              return batch
            })
            return { ...order, batches: newBatchesState }
          }
        }
        return order
      })
      return newOrdersState
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const currentOrder = state.find((order) => order.event_id === action.event.id)
      // Check if an order object for this event_id exists
      // if not, return current state
      if (currentOrder) {
        // Check if a batch object for this size_id exists
        // if not, return current state
        if (currentOrder.batches.find((batch) => batch.size_id === action.size.id)) {
          const newOrdersState = state.map((order) => {
            if (order.event_id === action.event.id) {
              const newBatchesState = order.batches.map((batch) => {
                if (batch.size_id === action.size.id) {
                  const newQuantity =
                    batch.order_quantity < 1
                      ? batch.order_quantity
                      : batch.order_quantity - 1
                  return { ...batch, order_quantity: newQuantity }
                }
                return batch
              })
              return { ...order, batches: newBatchesState }
            }
            return order
          })
          return newOrdersState
        }
      }
      return state
    }
    case REMOVE_PRODUCTS_FROM_CART: {
      const currentOrder = state.find((order) => order.event_id === action.event.id)
      // Check if an order object for this event_id exists
      // if not, return current state
      if (currentOrder) {
        // Check if a batch object for this size_id exists
        // if not, return current state
        if (currentOrder.batches.find((batch) => batch.size_id === action.size.id)) {
          const newOrdersState = state.map((order) => {
            if (order.event_id === action.event.id) {
              const newBatchesState = order.batches.map((batch) => {
                if (batch.size_id === action.size.id) {
                  // change the quantity of selected product size
                  // to the quantity available
                  const productSizes = action.product.sizes.map((size) =>
                    size.size_id === batch.size_id
                      ? { ...size, quantity: action.adjustment }
                      : size
                  )
                  return {
                    ...batch,
                    order_quantity: action.adjustment,
                    product: { ...action.product, sizes: productSizes },
                    quantity: action.adjustment,
                  }
                }

                return batch
              })
              return { ...order, batches: newBatchesState }
            }
            return order
          })
          return newOrdersState
        }
      }
      return state
    }
    case SUBMIT_ORDERS: {
      if (action.success) return []
      else return state
    }
    case EMPTY_CART: {
      return []
    }
    default:
      return state
  }
}
