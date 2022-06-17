export const RECEIVE_SELLER_MARKETS = "RECEIVE_SELLER_MARKETS"

const receiveSellerMarkets = (markets) => {
  return {
    type: RECEIVE_SELLER_MARKETS,
    markets,
  }
}

export default { receiveSellerMarkets }
