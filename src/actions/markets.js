import marketServices from "../services/markets"

export const RECEIVE_MARKETS = "RECEIVE_MARKETS"

export const receiveMarkets = () => {
  return async (dispatch) => {
    try {
      const markets = await marketServices.getAllMarkets()

      if (markets) {
        dispatch({ type: "RECEIVE_MARKETS", markets: markets })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
