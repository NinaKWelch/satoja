export const RECEIVE_SELLER_PRODUCTS = "RECEIVE_SELLER_PRODUCTS"

const receiveSellerProducts = (products) => {
  return {
    type: RECEIVE_SELLER_PRODUCTS,
    products,
  }
}

// TODO: add product

// TODO: delete product

// TODO: update product

export default { receiveSellerProducts }
