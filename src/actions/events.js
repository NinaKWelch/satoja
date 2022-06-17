import { getEvents, getEventProduct } from "../services/events"
import { NOTIFY_ERROR } from "./notification"
import moment from "moment"
export const RECEIVE_EVENTS = "RECEIVE_EVENTS"
export const UPDATE_EVENTS = "UPDATE_EVENTS"
export const ADD_EVENT = "ADD_EVENT"
export const UPDATE_EVENT = "UPDATE_EVENT"

const filterEventsByCurrent = (arr) => {
  const currentDate = moment()
  return arr.filter((item) => moment(item.endtime).isSameOrAfter(currentDate))
}

// fetch events from the server
export const receiveEvents = () => async (dispatch) => {
  const events = await getEvents()

  if (events && events.length > 0) {
    // only store current or ongoing events to local state
    const currentEvents = filterEventsByCurrent(events)

    dispatch({ type: "RECEIVE_EVENTS", events: currentEvents })
  }

  if (events && events.status === 500) {
    dispatch({ type: NOTIFY_ERROR, message: "Tapahtumien haku palvelimelta epäonnistui" })
  }
}

// set current events to local state
export const setEvents = (events) => {
  return (dispatch) => {
    dispatch({ type: "RECEIVE_EVENTS", events })
  }
}

// fetch events from the server
// and add selected event with selected product to local state
export const updateEvents = (id, product) => async (dispatch) => {
  const events = await getEvents()
  const currentDate = moment()

  if (events && events.length > 0) {
    const event = events.find((event) => event.id === id)

    if (event) {
      // check that event is current or ongoing
      const isCurrent = moment(event.endtime).isSameOrAfter(currentDate)

      // update local state for events
      isCurrent &&
        dispatch({ type: "UPDATE_EVENTS", event: { ...event, products: [product] } })
    } else {
      // set events to an empty array
      dispatch({ type: "UPDATE_EVENTS", event: [] })
    }
  }

  if (events && events.status === 500) {
    dispatch({ type: NOTIFY_ERROR, message: "Tapahtumien haku palvelimelta epäonnistui" })
  }
}

// add an event to local state
export const addEvent = (event) => {
  return (dispatch) => {
    dispatch({ type: "ADD_EVENT", event })
  }
}

// update an event in store
export const updateEvent = (event) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_EVENT", event })
  }
}

// fetch product from the server
export const receiveProduct = (event_id, product_id) => async (dispatch) => {
  const response = await getEventProduct(event_id, product_id)

  if (response && response.data) {
    // check that product is still at the selected event
    const hasEvent = response.data.events.includes(event_id)

    hasEvent
      ? dispatch(updateEvents(event_id, response.data))
      : dispatch({ type: "UPDATE_EVENTS", event: [] })
  }

  if (response && response.status === 500) {
    dispatch({ type: NOTIFY_ERROR, message: "Tuotteiden haku palvelimelta epäonnistui" })
  }
}
