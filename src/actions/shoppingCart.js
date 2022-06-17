import { submitBuyerOrders } from "../services/orders"
import { NOTIFY_VERIFY, NOTIFY_ERROR } from "./notification"
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART"
export const REMOVE_PRODUCTS_FROM_CART = "REMOVE_PRODUCTS_FROM_CART"
export const SUBMIT_ORDERS = "SUBMIT_ORDERS"
export const EMPTY_CART = "EMPTY_CART"

const updateSize = (size, action) => {
  // NOTE: size id key names may differ
  return {
    ...size,
    id: size.size_id ? size.size_id : size.id,
    reserved_quantity:
      action === "add" ? size.reserved_quantity + 1 : size.reserved_quantity - 1,
  }
}

const updateProduct = (product, size) => {
  return {
    ...product,
    sizes: product.sizes.map((item) => (item.id !== size.id ? item : size)),
  }
}

const getEventWithId = (event) => {
  // event id key names may differ
  return { ...event, id: event.event_id ? event.event_id : event.id }
}

export const addProductToCart = (product, size, event) => {
  const updatedSize = updateSize(size, "add")

  return (dispatch) => {
    dispatch({
      type: "ADD_PRODUCT_TO_CART",
      product: updateProduct(product, updatedSize),
      size: updatedSize,
      event: getEventWithId(event),
    })
  }
}

export const removeProductFromCart = (product, size, event) => {
  const updatedSize = updateSize(size, "reduce")

  return (dispatch) => {
    dispatch({
      type: "REMOVE_PRODUCT_FROM_CART",
      product: updateProduct(product, updatedSize),
      size: updatedSize,
      event: getEventWithId(event),
    })
  }
}

//TODO check this
export const removeProductsFromCart = (product, size, event, adjustment) => {
  const updatedSize = updateSize(size, "reduce")

  return (dispatch) => {
    dispatch({
      type: "REMOVE_PRODUCTS_FROM_CART",
      product: updateProduct(product, updatedSize),
      size: updatedSize,
      event: getEventWithId(event),
      adjustment,
    })
  }
}

export const submitOrders = (orders, buyerID) => async (dispatch) => {
  const response = await submitBuyerOrders(orders, buyerID)

  if (response && response !== undefined && response.status === 200) {
    dispatch({ type: "SUBMIT_ORDERS", success: true })
    dispatch({ type: NOTIFY_VERIFY, message: "Tilauksesi on lähetetty tuottajalle" })
  } else {
    dispatch({
      type: NOTIFY_ERROR,
      message: "Tilauksen lähettäminen tuottajalle epäonnistui",
    })
  }
}

export const emptyCart = () => {
  return (dispatch) => {
    dispatch({ type: "EMPTY_CART" })
  }
}
