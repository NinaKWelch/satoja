import { SET_SELLER_PAYMENT_OPTIONS } from "../actions/payments"

/*
const tempOptions = [
  { name: "Kortti", selected: false },
  { name: "Käteinen", selected: false },
  { name: "MobilePay", selected: false },
]
*/

export const payments = (state = [], action) => {
  switch (action.type) {
    case SET_SELLER_PAYMENT_OPTIONS:
      return action.options
    default:
      return state
  }
}
