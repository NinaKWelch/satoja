export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS"

const receiveProducts = (products) => {
  return {
    type: RECEIVE_PRODUCTS,
    products,
  }
}

export default { receiveProducts }
