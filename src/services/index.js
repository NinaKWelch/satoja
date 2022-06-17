import { getProducts } from "./products"
// import { getEvents } from "./events"

export const getInitialData = () => {
  return Promise.all([getProducts() /*, getEvents()*/])
    .then(([products /*, events*/]) => ({
      products,
      // events,
    }))
    .catch((error) => {
      console.error(error.message)
    })
}
